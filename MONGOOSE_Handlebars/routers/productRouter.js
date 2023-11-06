const express = require('express')
const Product = require('../models/Product')
const { createProduct, getProducts, deleteProductById } = require('../dao/controllers/productController')

const productRouter = express.Router()




productRouter.get('/', async (req, res) =>{
    const {order} = req.query
    try{
        const products = await  getProducts()

        res.status(200).render('products', {products})
    }
    catch(err){
        res.status(500).send('Error al obtener la lista de productos')
    }
})


productRouter.get('/detail', async (req, res) =>{
    const {productId} = req.query 
    
    const product =  await Product.findById(productId)

    if(product){
        res.render('detail', {product, editMode: false})
    }
    else{
        res.render('error')
    }
    
})



productRouter.post('/edit', async (req, res) =>{
    const {nombre, descripcion, stock, precio, id} = req.body

    const updatedProduct = await Product.findByIdAndUpdate(id, {precio, stock, nombre, descripcion}, {new: true})

    res.redirect('/product/detail?productId=' + id)
})


productRouter.get('/new', (req, res) =>{
    res.render('newProduct')
})

productRouter.post('/new', async (req, res) =>{
    const {nombre, descripcion, stock, precio} = req.body
    if(nombre && descripcion && stock && precio){
        const result = await createProduct
        ({nombre, descripcion, stock, precio})
        if(result){
            res.redirect('/products')
        }
        else{
            res.render('error')
        }
    }
    res.render('newProduct', {error: 'no has llenado todos los campos'})
    
})

productRouter.post('/delete', async (req, res) =>{
    const {productId} = req.body
    await deleteProductById(productId)
    res.redirect('/products')
})



module.exports = productRouter