const  express=require('express')
const PORT =8080
const bodyParser = require('body-parser')

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

app.get('/reglas',(req,res)=>{
    res.render('reglas')
})

app.listen(PORT,()=>{
    console.log(`El servidor se inicio en el puerto: ${PORT}`)
})
 
 