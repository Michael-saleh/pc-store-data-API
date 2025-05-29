const express = require('express');
const router = express.Router();
const { Order } = require('../models/orderSchema');

// Get all orders
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

module.exports = router; 