const mongoose = require('mongoose');
const Product = require('./models/product');
require('dotenv').config();

/* 
npm init -y 

npm install mongoose 
*/
const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const CONNECTION_URL = `mongodb+srv://matu_dev:${DB_PASSWORD}@cluster0.xyjacy2.mongodb.net/${DB_NAME}`


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


mongoose.connect(CONNECTION_URL, 
    {
        useNewUrlParser: true,
    }
)
.then(() =>{
    console.log('Conexion exitosa')
    createProduct({
        nombre: 'silla',
        precio: 3000,
        descripcion: 'Silla comoda para programar',
        stock: 7
    })
})
.catch((err) =>{
    console.error('No se pudo conectar con mongo atlas correctamente')
    console.error(err)
})

console.log('hola')

/* console.log(sumar(prompt('ingrese un numero'), fetch('direccionRandom'))) */


//callstack => pila de llamadas

//enviame por consola el resultado de la funcion sumar

//prompt        SYNC   |   fetch   ASYNC (el estado inicial es pending )
//sumar         SYNC
//console.log   SYNC


//                         fetch resolved (cambia el estado de la promesa)


//CRUD =>  create read update delete

//Un e-commerce







const getAllProducts  = async () =>{
    try{
        const products = await Product.find()
        console.log(products)
        return products
    }
    catch(error){
        throw error
    }
}

const updateStockById = async (id, stock) =>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, {stock}, {new: true})
        console.log(updatedProduct  )
        return updatedProduct
    }
    catch(error){
        throw error
    }
}

const deleteProductById = async (id) =>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(id)
        console.log("Producto eliminado exitosamente")
        console.log(deletedProduct)
    }
    catch(error){
        throw error
    }
}

/* deleteProductById('6526efca64f1b0d8aeaa8d1d') */

/* updateStockById('6526efca64f1b0d8aeaa8d1d', 10) */
/* 


getAllProducts()
 */

/* createProduct({
    nombre: 'tv samsung',
    precio: 3000,
    stock: 5, 
    descripcion: 'buena tele'
}) */

