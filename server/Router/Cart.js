const express = require('express');
const router = express.Router();
const Cart = require('../Model/CartModel');

router.get('/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const cart = await Cart.findOne({ c_id: customerId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Add product to cart
router.post('/addcart', async (req, res) => {
    const { c_id, productId, productTitle, productPrice, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ c_id });
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, productTitle, productPrice, quantity });
            }
        } else {
            cart = new Cart({
                c_id,
                products: [{ productId, productTitle, productPrice, quantity }]
            });
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete product from cart
router.delete('/:c_id/product/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ c_id: req.params.c_id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update product quantity in cart
router.put('/:c_id/product/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ c_id: req.params.c_id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const productIndex = cart.products.findIndex(p => p.productId.toString() === req.params.productId);
        if (productIndex >= 0) {
            cart.products[productIndex].quantity = req.body.quantity;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Clear the cart
router.delete('/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        await Cart.findOneAndDelete({ customerId });
        res.status(204).send();
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Failed to clear cart' });
    }
});

module.exports = router;