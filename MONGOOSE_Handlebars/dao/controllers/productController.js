const Product = require("../../models/Product")




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


const getProducts = async () =>{
    return await  Product.find()
}


module.exports = {createProduct, getProducts}