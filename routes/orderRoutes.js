import express from "express";
import { Order } from "../models/orderSchema.js";

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

export default router; 