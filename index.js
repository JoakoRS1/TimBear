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
    const burl = req.body.nuevourl
    const bestado = req.body.nuevoestado
    
    await db.Banner.create({
        nombre: bnombre,
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
            ['id','ASC']
        ]
    });

    res.render('administrarPartidas',{
        partidas:partidas,
        juego:juego,
        nombre: req.session.nombre
    })
})

app.post('/administrarPartidas/agregar',async (req,res)=>{
    const juego = req.body.partida_JuegoID
    const fecha = req.body.partida_fecha
    const inicio = req.body.partida_inicio
    const duracion = req.body.partida_duracion
    const estadoP = req.body.partida_Estado
    var estado = 0
    if(estadoP=="Pendiente"){
        estado = 0
    }
    else if(estadoP=="Iniciado"){
        estado = 1
    }
    else if(estadoP=="Finalizado"){
        estado = 2
    }
    else{
        estado = 3
    }
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
    const idPartida = req.body.partida_id2
    console.log("id: "+idPartida)
    const juego = req.body.partida_JuegoID2
    const fecha = req.body.partida_fecha2
    const inicio = req.body.partida_inicio2
    const duracion = req.body.partida_duracion2
    const estadoP = req.body.partida_Estado2
    var estado = 0
    if(estadoP=="Pendiente"){
        estado = 0
    }
    else if(estadoP=="Iniciado"){
        estado = 1
    }
    else if(estadoP=="Finalizado"){
        estado = 2
    }
    else{   
        estado = 3
    }
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

app.get('/partidas', async(req,res)=>{
    //Si se inicio sesion buscar usuario para mostrar su nombre en la parte de menu
    const rol = req.session.rol    

    const partidas = await db.Partida.findAll();

    res.render('partidas', {
        partidas : partidas,
        rol: rol
    })
})

app.get('/administrarCategorias', (req, res) => {

    
    res.render('administrarCategorias')
})

app.get('/AdministrarJuegos', async(req, res) => {
    const juegos = await db.Juego.findAll();
    const UsuarioA = await db.Usuario.findOne({
        where: {
            id : 1
        }
    });
    
    res.render('administrarJuegos', {
        juegos : juegos,
        usuario : UsuarioA,
        nombre: req.session.nombre
    })
})

app.get('/AdministrarClientes', async(req, res) => {
    const usuarios = await db.Usuario.findAll();
    
    res.render('administrarClientes', {
        clientes : usuarios
    })
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
    console.log(req.body.nombreU)
    const apellidoU = "Cornejo"
    const dniU = req.body.dniU
    const correoU = req.body.correoU
    const contraU = req.body.contraU
    const confirmacontraU = req.body.confirmarcontraU
    const numeroU = req.body.numeroU
    const direccionU = req.body.direcU 
    var depaU = req.body.Departamento
    var provinciaU = req.body.Provincia    
    var distritoU = req.body.Distrito
    var inputElements = req.body.Checks;

    await db.Usuario.create({
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
        PEP: inputElements
    })

    res.redirect('/paginaespera')
})

app.get('/verbanner', (req,res)=>{
    res.redirect('/')
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
 
 