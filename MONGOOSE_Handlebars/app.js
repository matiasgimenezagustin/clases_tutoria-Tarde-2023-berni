const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/Product')
const hbs = require('hbs')
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


//ENDPOINTS

app.get('/products', async (req, res) =>{
    try{
        const products = await  Product.find()
        console.log(products)
        res.status(200).render('products', {products})
    }
    catch(err){
        res.status(500).send('Error al obtener la lista de productos')
    }
})
/* request, response */
app.get('/product/detail', async (req, res) =>{
    const {productId, nombre} = req.query 
    const product =  await Product.findById(productId)
    if(product){
        res.render('detail', {product})
    }
    else{
        res.send('<h2>Error 404, pagina no encontrada <a href="/products">Volver</a></h2>')
    }
    console.log(productId, nombre)
    
})


app.listen(PORT, () =>{
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}/products`)
})


const createProduct = async (product) =>{
    try {
        const newProduct = new Product(product)
        await newProduct.save()
        console.log('producto guardado')
    }
    catch(error){
        throw error
    }
} 

