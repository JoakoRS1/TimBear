const  express=require('express')
const PORT =8080
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./dao/models')
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
    res.render('inicio')
})
app.get('/TerminosYCondiciones',(req,res)=>{
    res.render('terminosycondiciones')
})

app.get('/reglas',(req,res)=>{
    res.render('reglas')
})
app.get('/PoliticasPrivacidad',(req,res)=>{
    res.render('PoliticasPrivacidad')
})

app.get('/partidas',(req,res)=>{

    res.render('partidas')
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


//Iniciar sesion para poder usar el menu de opciones (aun falta)
app.post('/login', async (req, res) => {
    const correoA = req.body.correoU
    const passwordA = req.body.passwordU
    
    
    const Usuarios = await db.Usuario.findAll()
    Usuarios.forEach((usuario) =>{
        if(usuario.correo == correoA){
        usuarioA = usuario}
        else{
            console.log("NO EXISTE")
        }
    })
    
    if(usuarioA.correo!= null){
    if(usuarioA.password == passwordA){
        console.log("la clave ta bien")
        res.redirect('/')
    }
    else{
        console.log("la clave ta mal")
        res.redirect('/reglas')
    }}
    else{
        console("todo mal")
    }
})


app.listen(PORT,()=>{
    console.log(`El servidor se inicio en el puerto: ${PORT}`)
})
 
 