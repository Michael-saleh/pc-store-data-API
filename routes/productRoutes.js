import express from "express";
import { Product } from "../models/productSchema.js";

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Get a specific product
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const product = await Product.findById(id);
    res.send(product);
})

export default router; 