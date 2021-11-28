const  express=require('express')
const PORT = 8080
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./dao/models')
const usuario = require('./dao/models/usuario')
const app = express()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
})) 

app.use(express.static('assets'))
app.set('view engine','ejs')
app.use(session({
    secret : "sam",
    resave : false,
    saveUninitialized : false
}))



app.get('/', async(req,res)=>{
    const banners = await db.Banner.findAll({
        order :[
            ['id', 'ASC']
        ]
    });
    res.render('inicio',{
        banners: banners,
        rol: req.session.rol,
        nombre: req.session.nombre
    })
})

app.get('/TerminosYCondiciones',(req,res)=>{
    res.render('terminosycondiciones')
})

app.get('/reglas',(req,res)=>{
    res.render('reglas',{
        rol: req.session.rol,
        nombre: req.session.nombre})
})


app.get('/nosotros',(req,res)=>{
    res.render('nosotros',{
        rol: req.session.rol,
        nombre: req.session.nombre})
})


app.get('/PoliticasPrivacidad',(req,res)=>{
    res.render('PoliticasPrivacidad',{
        rol: req.session.rol,
        nombre: req.session.nombre})
})

app.get('/administrarBanners', async (req, res)=>{
    const banners = await db.Banner.findAll({
        order :[
            ['id', 'ASC']
        ]
    });
    //console.log(torneos);
    res.render('administrarBanner',{
        banners: banners,
        rol: req.session.rol,
        nombre: req.session.nombre
    })
})

app.get('/administrarBanners/new', (req, res)=>{
    res.render('newBanner',{
        rol: req.session.rol,
        nombre: req.session.nombre
    })
})

app.post('/administrarBanners/new', async (req, res)=>{

    const bnombre = req.body.nuevonombre
    const urlI = req.body.urlimagen
    const burl = req.body.nuevourl
    const bestado = req.body.nuevoestado
    
    
    await db.Banner.create({
        nombre: bnombre,
        urlImagen: urlI,
        url: burl,
        estado: bestado
    })
    res.redirect('/administrarBanners')
    
})

app.get('/administrarBanners/editar/:id', async (req,res) =>{  
    const idBanner = req.params.id
    const banner = await db.Banner.findOne({
        where: {
            id: idBanner
        }
    })
    res.render('editarBanner', {
        banner: banner,
        rol: req.session.rol,
        nombre: req.session.nombre
    })
})

app.post('/administrarBanners/editar', async(req,res)=>{
    const idBanner = req.body.idB
    const bnombre = req.body.nuevonombre
    const burl = req.body.nuevourl
    const bestado = req.body.nuevoestado
    
    const banner = await db.Banner.findOne({
        where: {
            id: idBanner
        }
    })
    
    
    banner.nombre = bnombre
    banner.url = burl
    banner.estado = bestado
    
    await banner.save()
    res.redirect('/administrarBanners')
})

app.get('/administrarPartidas',async (req,res)=>{
    const juego = await db.Juego.findAll()
    const partidas = await db.Partida.findAll({
        order:[
            ['fecha','DESC'],
            ['hora','DESC']
        ]
    });

    let nlistapartidas = []
    for(let partida of partidas){
        const Juego = await partida.getJuego()
        nlistapartidas.push({
            id: partida.id,
            fecha: partida.fecha,
            hora: partida.hora,
            duracion: partida.duracion,
            estado: partida.estado,
            equipoA: partida.equipoA,
            equipoB: partida.equipoB,
            factorA: partida.factorA,
            factorB: partida.factorB,
            factorEmpate: partida.factorEmpate,
            Resultado: partida.Resultado,
            juegoNombre: Juego.nombre
        })
    }
    if(req.session.rol=="admin"){
        res.render('administrarPartidas',{
            partidas:nlistapartidas,
            juego:juego,
            rol: req.session.rol,
            nombre: req.session.nombre
        })
    }else{
        res.redirect('/noAutorizado')
    }
})
app.get('/noAutorizado',(req,res)=>{
    res.render('noeresAdmin',{
        rol: req.session.rol,
            nombre: req.session.nombre
    })
})
app.post('/administrarPartidas/agregar',async (req,res)=>{
    const juego = req.body.partida_JuegoID
    const fecha = req.body.partida_fecha
    const inicio = req.body.partida_inicio
    const duracion = req.body.partida_duracion
    const estado = req.body.partida_Estado
   
    const EA = req.body.partida_EA
    const EB = req.body.partida_EB
    const FA = req.body.partida_FA
    const FB = req.body.partida_FB
    const FE = req.body.partida_FE
    const resultado = req.body.partida_Resultado

    await db.Partida.create({
        juegoId: juego,
        fecha: fecha,
        hora: inicio,
        duracion: duracion,
        estado:estado,
        equipoA: EA,
        equipoB: EB,
        factorA: FA,
        factorB: FB,
        factorEmpate: FE,
        Resultado: resultado
    })
    res.redirect('/administrarPartidas')
})
app.post('/administrarPartidas/editar',async(req,res)=>{
    const idPartida = req.body.partida_id
    console.log("id: "+idPartida)
    const juego = req.body.partida_JuegoID2
    const fecha = req.body.partida_fecha2
    const inicio = req.body.partida_inicio2
    const duracion = req.body.partida_duracion2
    const estado = req.body.partida_Estado2
    
   
    const EA = req.body.partida_EA2
    const EB = req.body.partida_EB2
    const FA = req.body.partida_FA2
    const FB = req.body.partida_FB2
    const FE = req.body.partida_FE2
    const resultado = req.body.partida_Resultado2
    const partida = await db.Partida.findOne({
        where:{
            id:idPartida
        }
    })
        partida.juegoId= juego
        partida.fecha= fecha
        partida.hora= inicio
        partida.duracion= duracion
        partida.estado=estado
        partida.equipoA= EA
        partida.equipoB= EB
        partida.factorA= FA
        partida.factorB= FB
        partida.factorEmpate= FE
        partida.Resultado= resultado
        await partida.save()
        res.redirect('/administrarPartidas')
})
app.get('/administrarPartidas/eliminar/:codigo',async(req,res)=>{
    const idPartida = req.params.codigo
    await db.Partida.destroy({
        where :{
            id : idPartida
        }
    })
    res.redirect('/administrarPartidas')
})

//Partidas
app.get('/partidas', async(req,res)=>{
    const rol = req.session.rol 
    const usuario = req.session.nombre 

    const banners = await db.Banner.findAll({
        order :[
            ['id', 'ASC']
        ]
    });  

    const partidas = await db.Partida.findAll();
    const juegos = await db.Juego.findAll();

    res.render('partidas', {
        partidas : partidas,
        rol: rol,
        nombre : usuario,
        juegos : juegos,
        banners : banners
    })
})

app.get('/partidas/:id_juego', async(req,res)=>{
    const rol = req.session.rol    
    const juegoId = req.params.id_juego;
    const nombre = req.session.nombre

    const banners = await db.Banner.findAll({
        order :[
            ['id', 'ASC']
        ]
    });

    const partidas = await db.Partida.findAll({
        where: {
            juegoId : juegoId
        }
    });
    const juegos = await db.Juego.findOne({
        where: {
            id : juegoId
        }
    })

    res.render('partidas', {
        partidas : partidas,
        rol: rol,
        nombre: nombre,
        juegos : juegos,
        banners : banners
    })
})

app.get('/administrarCategorias', async (req, res) => {

    if(req.session.rol=="admin"){
        res.render('administrarCategorias')
        const categorias = await db.Categoria.findAll({
            order :[
                ['id', 'ASC']
            ]
        })

        res.render('administrarCategorias', {
            categorias : categorias,
            rol: req.session.rol,
            nombre: req.session.nombre
        })

    }
    else{
        res.redirect('/noAutorizado')
    }
})

//NUEVA CATEGORÍA

app.get('/administrarCategorias/nuevo', (req, res) => {
    if(req.session.rol == "admin")
    {
        res.render('nuevaCategoria')
    }
    else
    {
        res.redirect('/noAutorizado')
    }
})
app.post('/administrarCategorias/nuevo', async (req, res) => {
    const categoriaNombre = req.body.categoriaNombre

    await db.Categoria.create({
        nombre: categoriaNombre
    })

    res.redirect('/administrarCategorias')
})

//MODIFICAR CATEGORIAS

app.get('administrarCategorias/modificar/:id', async (req, res) => {
    if(req.session.rol == "admin")
    {
        const idCategoria = req.params.id

        const categoria = await db.Categoria.findOne({
            where : {
                id : idCategoria
            }
        })
        
    res.render('modificarCategoria', {
        categoria : categoria
    })

    }
    else
    {
        res.redirect('/noAutorizado')
    }
})

//ELIMINAR CATEGORIAS
app.get('/administrarCategorias/eliminar/:id', async (req, res) => {
    const categoriaId = req.params.id

    await db.Categoria.destroy({
        where : {
            id : categoriaId
        }
    })

    res.redirect('/administrarCategorias')


})


//Mantenimiento Juego 
app.get('/AdministrarJuegos', async(req, res) => {
    const juegos = await db.Juego.findAll({
        order :[
            ['id', 'ASC']
        ]
    });
    const categorias = await db.Categoria.findAll();
    
    res.render('administrarJuegos', {
        juegos : juegos,
        rol: req.session.rol,
        nombre: req.session.nombre,
        categorias : categorias
    })
})

app.post('/AdministrarJuegos/agregar', async(req, res) => {
    const jnombre = req.body.nuevonombre1
    const jcategoria = req.body.nuevacategoria1
    await db.Juego.create({
        nombre: jnombre,
        categoria: jcategoria
    });

    res.redirect('/AdministrarJuegos')
})

app.post('/AdministrarJuegos/editar', async (req,res)=>{
    const idJuego = req.body.idJ
    const jnombre = req.body.nuevonombre2
    const jcategoria = req.body.nuevacategoria2

    const juego = await db.Juego.findOne({
        where: {
            id: idJuego
        }
    })
    if(jcategoria ==-1){
        //No se cambiara la categoria
        jcategoria = juego.categoria;
    }
    
    const categoria = await db.Categoria.findOne({
        where : {
            nombre : jcategoria
        }
    })
    
    juego.nombre = jnombre
    juego.categoria = jcategoria
    juego.categoriaId = categoria.id
    
    await juego.save()
    res.redirect('/AdministrarJuegos')
})

app.get('/administrarJuegos/eliminar/:codigo',async(req,res)=>{
    const idJuego = req.params.codigo
    await db.Partida.destroy({
        where : {
            juegoId : idJuego
        }
    })

    await db.Juego.destroy({
        where :{
            id : idJuego
        }
    })
    res.redirect('/administrarJuegos')
})
//fin mantenimiento juego

//Mantenimiento de clientes
app.get('/AdministrarClientes', async (req,res)=>{
    const clientes = await db.Usuario.findAll({
        order :[
            ['id', 'ASC']
        ]
    });

    res.render('AdministrarClientes',{
        clientes : clientes,
        rol : req.session.rol,
        nombre: req.session.nombre,
        query : null
    })
})

app.post('/AdministrarClientes/editar',async(req,res)=>{
    const idCliente = req.body.cliente_id
    console.log("id: "+ idCliente)

    const cliente = await db.Usuario.findOne({
        where:{
            id : idCliente
        }
    })

    const estadoC = req.body.cliente_Estado2
    var estado = 0
    if(estadoC=="Pendiente de Validación"){
        estado = 0
    }
    else if(estadoC=="Validado"){
        estado = 1
    }
    else if(estadoC=="Dado de Baja"){
        estado = 2
    }
    else{ //No se selecciono estado (se queda con el estado anteriormente asignado)
        estado = cliente.estado
    }
        
    cliente.estado=estado
    
    await cliente.save()
    res.redirect('/administrarClientes')
})

app.get('AdministrarClientes/filtrar', async(req, res) => {
    const filtro = req.body.search

    const clientes = await Usuario.findAll();
    const clientesFiltrados = [];
    clientesFiltrados.push(clientes);
    

    function esBusqueda(elemento, lista) {
        if(elemento.includes(filtro)){
            return lista.push(elemento);
        }
      }
    var filtrados = clientesFiltrados.nombre.filter(esBusqueda) 
                    && clientesFiltrados.apellido.filter(esBusqueda) 
                    &&  clientesFiltrados.DNI.filter(esBusqueda);

    res.render('filtrarClientes', {
        clientes : filtrados,
        filtro : filtro
    })
})

/*
app.get('/AdministrarClientes/filtrar', async(req, res) => {
    const filtro = req.body.filtro;
    const clientes = await Usuario.findAll();

    for(var i =0; i< clientes.length(); i++){
        if(clientes[i].DNI.contains(filtro) || 
            clientes[i].nombre.contains(filtro) ||     
            clientes[i].apellido.contains(filtro)){
            clientesFiltrados.push(clientes[i])
        }
    }
    console.log(clientesFiltrados)

    res.render('filtroClientes',{
        clientes : clientesFiltrados,
        filtro : filtro
    })

})
//fin mantenimiento cliente */

app.get('/login', (req,res) => {
    if(req.session.rol != undefined){
        res.redirect('/')
    }
    else{
    res.render('login')}
})

app.post('/login', async (req, res) => {
    const correoA = req.body.correoU
    const passwordA = req.body.passwordU
    usuarioA = null
  
    const Usuarios = await db.Usuario.findAll()
    
    Usuarios.forEach((usuario) =>{
        if(usuario.correo == correoA){
                usuarioA = usuario
            }
    })

    if(usuarioA!= null){
        if(usuarioA.password == passwordA){
            console.log("la clave ta bien")
            req.session.rol = usuarioA.rol
            req.session.nombre = usuarioA.nombre
            console.log("sesion rol: ", req.session.rol)
            console.log("sesion nombre: ", req.session.nombre)
            res.redirect('/')
        }
        else{
            console.log("la clave ta mal")
            res.render('errorlogin')
        }}
        else{
            res.render('errorlogin')
            console.log("NO EXISTE")
        }
        
})

app.get('/paginaespera', async (req,res)=>{
    const Usuarios = await db.Usuario.findAll()
    res.render('paginaespera', {
        Usuarios: Usuarios
    })
})

app.get('/registro1', async (req,res) => {
    const Usuarios = await db.Usuario.findAll()
    res.render('registro1', {
        Usuarios: Usuarios
    })
})

app.post('/registro1', async (req, res) => {
    const nombreU = req.body.nombreU
    const apellidoU = req.body.apellidoU
    const dniU = req.body.dniU
    const correoU = req.body.correoU
    const contraU = req.body.contraU
    const confirmacontraU = req.body.confirmarcontraU
    const numeroU = req.body.numeroU
    var direccionU = req.body.direcU 
    var depaU = req.body.Departamento
    var provinciaU = req.body.Provincia    
    var distritoU = req.body.Distrito
    var pepsU = req.body.flexRadioDefault1;
    var pepnU = req.body.flexRadioDefault2;

    await db.Usuario.create({
        rol : 'usuario',
        nombre : nombreU,
        apellido : apellidoU,
        DNI: dniU,
        correo: correoU,
        password: contraU,
        numero: numeroU,
        direccion: direccionU,
        departamento: depaU,
        provincia: provinciaU,
        distrito: distritoU,
        PEP: pepsU
    })

    res.redirect('/paginaespera')
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
    console.log("Se cerró la sesión")
})

app.listen(PORT,()=>{
    console.log(`El servidor se inicio en el puerto: ${PORT}`)
})
 
 