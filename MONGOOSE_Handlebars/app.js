const express = require('express')
const mongoose = require('mongoose')

const hbs = require('hbs')
const bcrypt = require('bcrypt')
const session = require('express-session')

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 8080
const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const CONNECTION_URL = `mongodb+srv://matu_dev:${DB_PASSWORD}@cluster0.xyjacy2.mongodb.net/${DB_NAME}`



mongoose.connect(CONNECTION_URL,  {
    useNewUrlParser: true,
})
.then(() =>{
    console.log('conexion exitosa!')
})
.catch((err) =>{
    console.error(err)
})


//Configuracion de handlebars

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false})) //Middlewere que nos permite recibir formularios por el body

app.use(session({
    secret: 'mi-clave',
    resave: false, 
    saveUninitialized: false
}))



const productRouter = require('./routers/productRouter')
const servicesRouter = require('./routers/servicesRouter')


//ENDPOINTS

app.use('/products', productRouter)

app.use('/services', servicesRouter)


app.get('/register', (req, res) =>{
    res.render('register')
})

app.get('/', (req, res) =>{
    res.render('login')
})




//Creamos el endpoint product/new


app.listen(PORT, () =>{
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}/products`)
})




