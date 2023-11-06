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


const getProducts = async (order) =>{
    let products  = await  Product.find()
    console.log('hola')
    if(order){
        if(order == 'asc'){
            return products.sort((a, b) => a.precio - b.precio)
        }else{
            return products.sort((a, b) => b.precio - a.precio)
        }
    }
    return products
}

const deleteProductById = async (productId) =>{
    return await Product.findByIdAndDelete(productId)
}

module.exports = {createProduct, getProducts, deleteProductById}