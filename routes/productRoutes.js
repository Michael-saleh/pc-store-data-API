import express from "express";
const router = express.Router();
import { Product } from "../models/productSchema.js";
import authenticate from "../middlewares/authenticate.js";
import mongoose from "mongoose";

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Get a specific product
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.send(product);
});


router.delete('/:id', authenticate, async (req, res) => {
    try {
        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const product = await Product.findById(req.params.id);
        if (product) {
            try {
                const deleted = await Product.findByIdAndDelete(req.params.id);
                if (deleted) {
                    res.send(deleted);
                } else {
                    res.send("Product not found");
                }
            } catch (error) {
                res.send(error.message);
                console.log(error)
            }
        } else {
            res.send("Product not found")
        }
    }
    catch (err) {
        res.send(err.message)
    }
});

export default router; 