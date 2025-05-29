const express = require('express');
const router = express.Router();
const { Product } = require('../models/productSchema');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

module.exports = router; 