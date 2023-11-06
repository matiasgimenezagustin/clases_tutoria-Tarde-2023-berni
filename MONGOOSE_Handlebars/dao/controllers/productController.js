const Product = require("../../models/Product")




const createProduct = async (product) =>{
    try {
        const newProduct = new Product(product)
        await newProduct.save()
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

const deleteProductById = async (productId) =>{
    return await Product.findByIdAndDelete(productId)
}

module.exports = {createProduct, getProducts, deleteProductById}