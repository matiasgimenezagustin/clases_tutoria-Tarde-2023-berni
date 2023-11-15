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
const { createUser, isValidCredentials } = require('./dao/controllers/userController')


//ENDPOINTS

app.use('/products', productRouter)

app.use('/services', servicesRouter)


app.get('/register', (req, res) =>{
    res.render('register')
})

app.post('/register', async (req, res) =>{
    const user = req.body
    let sal = 10
    const hashedPassword = await bcrypt.hash(user.password, sal)
    let usuarioCreado = await createUser({...user, password: hashedPassword})
    console.log(usuarioCreado)
    res.redirect('login')
})

app.get('/', (req, res) =>{
    res.render('login')
})

app.post('/', async (req, res) => {
    const {email, password} = req.body
    /* Respuesta para manejar error */
    const user = {email, password}

    let result = await isValidCredentials(user)
    if(result.ok){
        res.redirect('/products')
    }else{
        res.render('login', {error: result.message})
    }
    

    /* Respuesta para enviar al usuario a la home */
    /* res.redirect('/dashboard') */
})


//Creamos el endpoint product/new


app.listen(PORT, () =>{
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}/products`)
})

/* Existe el azar? */

/* Math.random */

console.log(Math.random())