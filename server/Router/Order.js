const express = require('express')
const router = express.Router();
const Order  = require('../Model/OrderModel');

router.post('/buynow', async (req, res) => {
    const { customerId, products, total } = req.body;
    if (!products || products.length === 0) {
        return res.status(400).json({ message: 'Product information is required' });
    }
    const order = new Order({ customerId, products, total });
    try {
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to place order' });
    }
});


router.get('/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
});

module.exports = router;