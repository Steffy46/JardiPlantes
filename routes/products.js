const express = require('express');
const router = express.Router();

const ProductModel = require('../models/product');

 router.post('/new-products', async function(req, res, next){

    const newProduct = new ProductModel({
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        water: req.body.water,
        sun: req.body.sun
    })

    const productSaved = await newProduct.save();

    res.json({ recorded: true, data: productSaved })

 })

 router.get('/products', async function(req, res, next){
     const productsDb = await ProductModel.find()
     //console.log('########################## LES PLANTES', productsDb);
     res.json({ products: productsDb })
 })


module.exports = router;