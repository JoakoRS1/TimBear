const  express=require('express')
const PORT = process.env.PORT || 5000
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
        where: {
            estado: "activo"
        },
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
    if(req.session.rol=="admin"){
        res.render('administrarBanner',{
            banners: banners,
            rol: req.session.rol,
            nombre: req.session.nombre
            })
    }else{
        res.redirect('/noAutorizado')
    }
})

app.get('/administrarBanners/new', (req, res)=>{
    if(req.session.rol=="admin"){
    res.render('newBanner',{
        rol: req.session.rol,
        nombre: req.session.nombre
    })
    }else{
        res.redirect('/noAutorizado')
    }
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
    if(req.session.rol=="admin"){
    res.render('editarBanner', {
        banner: banner,
        rol: req.session.rol,
        nombre: req.session.nombre
    })
    }else{
        res.redirect('/noAutorizado')
    }
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

app.get('/administrarPartidas', async (req,res)=>{
    const juego = await db.Juego.findAll()
    const categoria = await db.Categoria.findAll()

    const partidas = await db.Partida.findAll({
        order:[
            ['fecha','DESC'],
            ['hora','DESC'],
        ],
        
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
            categoria :categoria ,
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
    const categoria = req.body.partida_CategoriaID
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
        categoriaId:categoria,
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
    const categoria = req.body.partida_CategoriaID2
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
        partida.categoriaId= categoria
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

//FILTRAR PARTIDAS

//FILTRAR PARTIDAS POR ESTADO
app.get('/administrarPartidas/filtrar/:filtro', async (req, res) => {
    if(req.session.rol=="admin"){

        const filtro = req.params.filtro

        if(filtro == 'todos')
        {
            res.redirect('/administrarPartidas')
        }
        else
        {
            const juego = await db.Juego.findAll()

            const categorias = await db.Categoria.findAll()
            
            const partidas = await db.Partida.findAll({
                order:[
                    ['fecha','DESC'],
                    ['hora','DESC']
                ]
            });
    
            let nlistapartidas = []
            for(let partida of partidas){
                const Juego = await partida.getJuego()
                if(partida.estado == filtro)
                {
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
            }
    
            res.render('administrarPartidas',{
                partidas : nlistapartidas,
                juego : juego,
                categoria : categorias,
                rol : req.session.rol,
                nombre : req.session.nombre
            })

        }

        
    }
    else
    {
        res.redirect('/noAutorizado')
    }
})

//FILTRAR PARTIDAS POR CATEGORIA
app.get('/administrarPartidas/filtrarCategoria/:categoriaId', async (req, res) => {
    if(req.session.rol=='admin')
    {
        const categoriaId = req.params.categoriaId
        const juego = await db.Juego.findAll()

            const categorias = await db.Categoria.findAll()

            
            const partidas = await db.Partida.findAll({
                order:[
                    ['fecha','DESC'],
                    ['hora','DESC']
                ]
            });
    
            let nlistapartidas = []
            for(let partida of partidas){
                const Juego = await partida.getJuego()
                if(partida.categoriaId == categoriaId)
                {
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
            }
    
            res.render('administrarPartidas',{
                partidas : nlistapartidas,
                juego : juego,
                categoria : categorias,
                rol : req.session.rol,
                nombre : req.session.nombre
            })
    }
    else
    {
        res.redirect('/noAutorizado')
    }
})

//Partidas
app.get('/partidas', async(req,res)=>{
    const rol = req.session.rol 
    const usuario = req.session.nombre 


    const partidas = await db.Partida.findAll();
    const juegos = await db.Juego.findAll();
    const categorias= await db.Categoria.findAll();
    
    res.render('partidas', {
        partidas : partidas,
        rol: rol,
        nombre : usuario,
        juegos : juegos,
        categorias: categorias,
    })
})

app.get('/partidas', async(req,res)=>{
    const rol = req.session.rol    
    const nombre = req.session.nombre
    let listaPartidas = []

    const banners = await db.Banner.findAll({
        order :[
            ['id', 'ASC']
        ]
    });

    const partidas = await db.Partida.findAll();
    const juegos = await db.Juego.findOne({
        where: {
            id : juegoId
        }
    })
    for(let partida of partidas){
            const Juego = await partida.getJuego()
                listaPartidas.push({
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

    const categorias= await db.Categoria.findAll();
    
    res.render('partidas', {
        partidas : listaPartidas,
        rol: rol,
        nombre: nombre,
        juegos : juegos,
        banners : banners,
        categorias: categorias
    })
    
})
app.get('/partidas/filtro/:id', async(req,res)=>{
    const categoriaid = req.params.id

    const juegos= await db.Juego.findAll();

    const banners = await db.Banner.findAll({
        order :[
            ['id', 'ASC']
        ]
    });

    const categorias=await db.Categoria.findAll()

    const partidas=await db.Partida.findAll({
        where: {
            categoriaId: categoriaid
        }
    })

    res.render('partidas', {
        partidas : partidas,
        rol: req.session.rol,
        nombre: req.session.nombre,
        categorias: categorias,
        banners : banners,
        juegos : juegos
    })
})

app.get('/partidas/fechasproximas', async(req,res) => {
    const today = new Date();
    const pasado = new Date(today)
    pasado.setDate(pasado.getDate() + 2)    

    let fechasproximas = [];
    console.log(pasado);

    const partidas = await db.Partida.findAll();

    for(let partida of partidas){
        const Juego = await partida.getJuego()
        if(partida.estado=="Pendiente"){
            if(partida.fecha < pasado){
                //const Juego = await partida.getJuego()
                fechasproximas.push({
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
        }
    }
    console.log(fechasproximas);

    const categorias = await db.Categoria.findAll();
    const juegos = await db.Juego.findAll();
    const banners = await db.Banner.findAll({
        order :[
            ['id', 'ASC']
        ]
    });

    res.render('partidasFecha',{
        partidas : fechasproximas,
        rol: req.session.rol,
        nombre: req.session.nombre,
        categorias: categorias,
        banners : banners,
        juegos : juegos
    })
    
})

app.get('/partidas/fechasantiguas', async(req,res) => {
    const pasado = get.Date()+2;
    const fechasproximas = [];
    console.log(pasado);

    const partidas = await db.Partida.findAll();

    partidas.forEach( (partida)=>{
        if(partida.estado=="Pendiente"){
            if(partidas.fecha <= pasado){
                fechasproximas.push(partida)
            }
        }
    })
    console.log(fechasproximas);

    const categorias = await db.Categoria.findAll();
    const juegos = await db.Juego.findAll();
    const banners = await db.Banner.findAll({
        order :[
            ['id', 'DESC']
        ]
    });

    res.render('partidasFecha',{
        partidas : fechasproximas,
        rol: req.session.rol,
        nombre: req.session.nombre,
        categorias: categorias,
        banners : banners,
        juegos : juegos
    })
    
})

//ADMINISTRAR CATEGOR??AS - PRINCIPAL

app.get('/administrarCategorias', async (req, res) => {

    if(req.session.rol=="admin"){
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

//NUEVA CATEGOR??A
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
    const categoriaNombre = req.body.categoria_nombre

    await db.Categoria.create({
        nombre: categoriaNombre
    })

    res.redirect('/administrarCategorias')
})

//MODIFICAR CATEGORIAS

app.get('/administrarCategorias/modificar/:id', async (req, res) => {
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

app.post('/administrarCategorias/modificar', async (req, res) => {
    const idCategoria = req.body.categoria_id
    const nombreCategoria = req.body.categoria_nombre

    const categoria = await db.Categoria.findOne({
        where :{
            id: idCategoria
        }
    })

    categoria.nombre = nombreCategoria

    await categoria.save()

    res.redirect('/administrarCategorias')
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
    
    if(req.session.rol=="admin"){
    res.render('administrarJuegos', {
        juegos : juegos,
        rol: req.session.rol,
        nombre: req.session.nombre,
        categorias : categorias
    })
    }else{
        res.redirect('/noAutorizado')
    }
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
    if(req.session.rol=="admin"){
    res.render('administrarClientes',{
        clientes : clientes,
        rol : req.session.rol,
        nombre: req.session.nombre
    })
    }else{
        res.redirect('/noAutorizado')
    }
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
    if(estadoC=="Pendiente de Validaci??n"){
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

app.get('/AdministrarClientes/filtrar', async(req, res) => {
    const filtroA = req.query.filtro;
    console.log(filtroA);
    const clientes = await db.Usuario.findAll();

    const clientesFiltrados = [];

    clientes.forEach( (cliente)=> {
        if(cliente.DNI.includes(filtroA) || 
        cliente.nombre.includes((filtroA)) ||     
        cliente.apellido.includes(filtroA)){
        clientesFiltrados.push(cliente);
    }
    })
           
    console.log(clientesFiltrados);
    if(req.session.rol=="admin"){

    res.render('filtroClientes', {
        clientes : clientesFiltrados,
        filtro : filtroA,
        nombre : req.session.nombre
    })
    }else{
        res.redirect('/noAutorizado')
    }
})

//fin mantenimiento cliente */

//VER HOJA DE APUESTAS

app.get('/hojaDeApuestas', async (req, res) => {

    if(req.session.rol == 'user')
    {
        const apuestas = await db.Apuesta.findAll({
            order :[
                ['id', 'ASC']
            ]
        })

        var montoTotal = 0
        var gananciaTotal = 0

        for (let apuesta of apuestas)
        {
            montoTotal += apuesta.monto
            gananciaTotal += apuesta.gananciaPosible
        }
    
        res.render('apuestas', {
            apuestas: apuestas,
            rol : req.session.rol,
            nombre : req.session.nombre,
            montoTotal : montoTotal,
            gananciaTotal : gananciaTotal
        })

    }
    else
    {
        res.redirect('/noAutorizado')
    }

})


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
            console.log("Credenciales correctas")
            req.session.rol = usuarioA.rol
            req.session.nombre = usuarioA.nombre
            console.log("sesion rol: ", req.session.rol)
            console.log("sesion nombre: ", req.session.nombre)
            res.redirect('/')
        }
        else{
            const error = "0"
            console.log("Contrase??a incorrecta")
            res.render('errorlogin', {error: error})
        }}
        else{
            error = "1"
            console.log("No se encontr?? el usuario")
            res.render('errorlogin', {error: error})
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
    var pepsU = req.body.PEPu;

    
    await db.Usuario.create({
        rol : 'user',
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
    console.log("Se cerr?? la sesi??n")
})


app.post('/hojaDeApuesta', async (req,res) => {
    const monto = req.body.apuesta_monto
    const apuestaId = req.body.apuesta_id



    const apuesta = await db.Apuesta.findOne({
        where : {
            id : apuestaId
        }
    })

    const ganancia = monto * apuesta.factorApostado



    apuesta.monto = monto
    apuesta.gananciaPosible = ganancia

    await apuesta.save()
    
    res.redirect('/hojaDeApuestas')
})

app.get('/historialDeApuestas', async(req,res)=>{


    if(req.session.rol == 'user')
    {
        const apuestas = await db.Apuesta.findAll({
            order :[
                ['id', 'ASC']
            ]
        })
        const partidas = await db.Partida.findAll({
            order :[
                ['id', 'ASC']
            ]
        })

    
        res.render('historial', {
            apuestas: apuestas,
            partidas: partidas,
            rol : req.session.rol,
            nombre : req.session.nombre
        })

    }
    else
    {
        res.redirect('/noAutorizado')
    }

})


//ELIMINAR PARTIDAS DE HOJA DE APUESTAS
app.get('/hojaDeApuestas/eliminar/:id', async (req, res) => {
    const apuestaId = req.params.id

    await db.Apuesta.destroy({
        where : {
            id : apuestaId
        }
    })

    res.redirect('/hojaDeApuestas')


}) 


app.listen(PORT,()=>{
    console.log(`El servidor se inicio en el puerto: ${PORT}`)
})
 
 