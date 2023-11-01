const express =require('express')

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