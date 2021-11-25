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
    res.render('reglas')
})

app.get('/nosotros',(req,res)=>{
    res.render('nosotros')
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

<<<<<<< HEAD
app.post('/administrarPartidas',async (req,res)=>{
    const juego = req.body.partida_JuegoID
    const fecha = req.body.partida_fecha
    const inicio = req.body.partida_inicio
    const duracion = req.body.partida_duracion
    const estadoP = req.body.partida_Estado
    const estado = 0
    if(estadoP=="Pendiente"){
        estado = 0
    }
    else if(estadoP="Iniciado"){
        estado = 1
    }
    else if(estadoP="Finalizado"){
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

})


=======
>>>>>>> c1d77d1c24e4ddee52665d8195f3a683a27344c1
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

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
    console.log("Se cerró la sesión")
})

app.listen(PORT,()=>{
    console.log(`El servidor se inicio en el puerto: ${PORT}`)
})
 
 