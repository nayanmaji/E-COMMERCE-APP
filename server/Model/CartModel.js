const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cart_id:{
        type:String
    },
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        productTitle:{
            type: String,
            ref: 'Product',
            // required: true
        },
        productPrice:{
            type: Number,
            ref: 'Product',
            // required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
