
const mongoose = require('mongoose')
require('dotenv').config();

const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const CONNECTION_URL = `mongodb+srv://matu_dev:${DB_PASSWORD}@cluster0.xyjacy2.mongodb.net/${DB_NAME}`

mongoose.connect(CONNECTION_URL, 
    {
        useNewUrlParser: true,
    }
)

const Product = mongoose.model('Producto', {
    nombre: String,
    precio: Number,
    stock: Number,
    descripcion: String
}, )


module.exports = Product