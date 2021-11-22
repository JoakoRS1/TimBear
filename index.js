const  express=require('express')
const PORT =8080
const bodyParser = require('body-parser')
const db = require('./dao/models')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.static('assets'))
app.set('view engine','ejs')

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

//Iniciar sesion para poder usar el menu de opciones (aun falta)
app.post('/login',  (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (username == "pw" && password == "123")
    {
        //login correcto -> llamar al endpoint torneos
        req.session.username = username //guardando variable en sesion (no se pierde la variable)
        res.redirect("/")
    }
    else {
        res.redirect('/login')
    }
})

app.listen(PORT,()=>{
    console.log(`El servidor se inicio en el puerto: ${PORT}`)
})
 
 