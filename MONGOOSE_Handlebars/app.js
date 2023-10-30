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
app.use(express.urlencoded({extended: false})) //Middlewere que nos permite recibir formularios por el body


const createProduct = async (product) =>{
    try {
        const newProduct = new Product(product)
        await newProduct.save()
        console.log('producto guardado')
        return true
    }
    catch(error){
        throw error
        return null
    }
} 



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
        res.render('error')
    }
    
})

//Creamos el endpoint product/new

app.get('/product/new', (req, res) =>{
    res.render('newProduct')
})

app.post('/product/new', async (req, res) =>{
    const {nombre, descripcion, stock, precio} = req.body
    if(nombre && descripcion && stock && precio){
        const result = await createProduct({nombre, descripcion, stock, precio})
        if(result){
            res.redirect('/products')
        }
        else{
            res.render('error')
        }
    }
    res.render('newProduct', {error: 'no has llenado todos los campos'})
    
})

app.delete('/product', (req, res) =>{
    const {productId} = req.query
    console.log(productId)
    res.redirect('/products')
})

app.get('/services/editmode', async (req, res) =>{
    const {productId} = req.query 
    const product =  await Product.findById(productId)
    if(product){
        res.render('detail', {product, editMode: true})
    }
    else{
        res.render('error')
    }
})

app.listen(PORT, () =>{
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}/products`)
})




