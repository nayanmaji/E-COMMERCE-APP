const express = require('express')
const router = express.Router();
const product = require('../Model/ProductModel');

router.post('/addproduct', async (req, res) => {
    try {
        const Products = new product(req.body);
        await Products.save();
        return res.status(200).json({ message: "sucess" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

router.get('/getproduct', async (req, res) => {
    try {
        const Product = await product.find();
        return res.status(200).json(Product);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

router.get('/getproduct/:id', async (req, res) => {
    const Product = await product.findById(req.params.id);
    if (Product) {
        res.json(Product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
})

module.exports = router;