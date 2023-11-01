const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/Product')
const hbs = require('hbs')
const productRouter = require('./routers/productRouter')
const servicesRouter = require('./routers/servicesRouter')
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





//ENDPOINTS

app.use('/product', productRouter)

app.use('/services', servicesRouter)



//Creamos el endpoint product/new


app.listen(PORT, () =>{
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}/products`)
})




