const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine',  'ejs')
app.set('views', __dirname + '/views')
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
    const data = {
        mensaje: 'Soy un mensaje desde node.js'
    }
    res.render('index', {data})
})

const products = [
    {
        nombre: 'tv samsung 32"',
        precio: 300000,
        id: 1
    },
    {
        nombre: 'tv samsung 42"',
        precio: 400000,
        id: 2
    },
    {
        nombre: 'tv samsung 49"',
        precio: 500000,
        id: 3
    }
]

app.get('/products', (req, res) =>{
    res.render('products', {products})
})

app.get('/products/new', (req, res) =>{
    res.render('form-new-product')
})

app.post('/products', (req, res) =>{
    const {precio, nombre} = req.body
    products.push({precio, nombre})
    res.redirect('/products')
})

app.listen(PORT, ()=>{
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}/` )
})