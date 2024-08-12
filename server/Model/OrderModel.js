const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            productTitle:{type: String, ref: 'Product'},
            productPrice:{type: Number, ref: 'Product'},
            quantity: { type: Number, required: true },
        }
    ],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
