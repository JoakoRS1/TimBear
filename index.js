const  express=require('express')
const PORT =8080
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



app.get('/',(req,res)=>{
    res.render('inicio',{
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
    res.render('PoliticasPrivacidad')
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
        juego:juego
    })
})


app.post('/administrarPartidas',async (req,res)=>{
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
    const usuarios = await db.Usuario.findOne({
        where : 
        { id : 1}
    });

    const partidas = await db.Partida.findAll();

    res.render('partidas', {
        partidas : partidas,
        usuario : usuarios,
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
        usuario : UsuarioA
    })
})

app.get('/AdministrarClientes', async(req, res) => {
    const usuarios = await db.Usuario.findAll();
    
    res.render('administrarClientes', {
        clientes : usuarios
    })
})

app.get('/login', (req,res) => {
    if(req.session.usuario != undefined){
        res.redirect('/')
    }
    else{
    res.render('login')}
})

app.post('/login', async (req, res) => {
    const correoA = req.body.correoU
    const passwordA = req.body.passwordU
    
    
    const Usuarios = await db.Usuario.findAll()
    Usuarios.forEach((usuario) =>{
        if(usuario.correo == correoA){
        usuarioA = usuario}
        else{
            usuarioA = null
            console.log("NO EXISTE")
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
        }
        
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

    await db.Usuario.create({
        nombre : nombreU,
        apellido : apellidoU
    })

    res.redirect('/registro2')
})

app.get('/registro2', async (req,res) => {
    const Usuarios = await db.Usuario.findAll()
    res.render('registro2',{
        Usuarios: Usuarios
    })
})

app.post('/registro2', async (req, res) => {
    const dniU = req.body.dniU

    await db.Usuario.create({
        dni : dniU,
    })

    res.redirect('/registro3')
})

app.get('/registro3', async (req,res)=>{
    const Usuarios = await db.Usuario.findAll()
    res.render('registro3',{
        Usuarios: Usuarios
    })
})
app.get('/registro4', (req,res)=>{
    res.render('registro4')
})
app.get('/registro5', (req,res)=>{
    res.render('registro5')
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
 
 