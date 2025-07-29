import express from "express";
const router = express.Router();
import { Product } from "../models/productSchema.js";
import authenticate from "../middlewares/authenticate.js";
import mongoose from "mongoose";

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find({}, 'name price');
    res.send(products);
});

// Get a specific product
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
});

// Create a new product
router.post('/', async (req, res) => {
    const product = await Product.findOne({ modelNumber: req.body.modelNumber });

    if (!product) {
        try {
            const newProduct = new Product({
                name: req.body.name,
                category: req.body.category,
                quantity: req.body.quantity,
                price: req.body.price,
                modelNumber: req.body.modelNumber,
                manifacturer: req.body.manifacturer,
                description: req.body.description,
                comments: [],
                orders: []
            });
            const savedProduct = await newProduct.save();
            res.json(savedProduct)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(400).json({ message: "Product already exists" })
    }
});

// Delete a specific product
router.delete('/:id', authenticate, async (req, res) => {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: "product not found" })

    } else {
        try {
            const deleted = await Product.findByIdAndDelete(req.params.id);
            if (!deleted) {
                res.status(400).json({ message: "Error deleting product" });
            } else {
                res.json(deleted);
            }
        } catch (error) {
            res.send(error.message);
            console.log(error)
        }
    }
});

// Edit product info
router.put('/:id', async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true });
        res.json(updated)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

export default router;