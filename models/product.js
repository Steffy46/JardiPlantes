const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    category: String,
    name: String,
    description: String,
    price: Number,
    image: String,
    water: String,
    sun: String,
})

const ProductModel = mongoose.model('products', productSchema)

module.exports = ProductModel