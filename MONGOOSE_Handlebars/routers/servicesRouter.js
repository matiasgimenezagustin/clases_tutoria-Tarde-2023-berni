const express =require('express')
const Product = require('../dao/models/Product')


const servicesRouter = express.Router()


servicesRouter.get('/editmode', async (req, res) =>{
    const {productId} = req.query 
    const product =  await Product.findById(productId)
    if(product){
        res.render('detail', {product, editMode: true})
    }
    else{
        res.render('error')
    }
})


module.exports = servicesRouter


/* 
Vamos a profesionalizar las consultas a nuestra DB:

Lo mas correcto es siempre separar las request de las consultas a la DB, ya que sino el codigo al estar tan mezclado se vuelve muy dificil de debbuguear, para ello existe el concepto de controller, que es un archivo que creamos para poder manejar las consultas que se hacen a la DB. De esta manera separamos la logica del request de la logica de consultas.

Crear un archivo llamado productController.js en una carpeta llamada controllers, y esta carpeta controllers debera estar dentro de una carpeta llamada DAO

dao/controllers/productController.js

El archivo debera tener dentro las siguientes funcionalidades

getProducts()
getProductById()
deleteProductById()
updateProductById()
createProduct()

*/