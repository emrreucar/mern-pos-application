const Product = require('../models/Product.js');
const express = require('express');

const router = express.Router();

//! create product
router.post('/add-product', async(req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("Product item added successfully");
    } catch (error) {
        res.status(400).json(error);
    }
});


//! get all product
router.get('/get-all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error);
    }
});


//! update product
router.put('/update-product', async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
        res.status(200).json({
            message: "Product updated successfully."
        });
    } catch (error) {
        res.status(400).json(error);
    }
});


//! delete product
router.delete('/delete-product', async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body.productId });
        res.status(200).json({
            message: "Product deleted successfully."
        })
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;