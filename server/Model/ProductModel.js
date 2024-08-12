const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    id : {
        type : Number,
        require : true
    },
    title: {
        type : String,
        require : true
    },
    description:{
        type : String,
        require : true
    },
    price:{
        type : Number,
        require : true
    },
    discountPercentage:{
        type : Number,
        require : true
    },
    rating:{
        type : Number,
        require : true
    },
    stock:{
        type : Number,
        require : true
    },
    brand:{
        type : String,
        require : true
    },
    category:{
        type : String,
        require : true
    },
    thumbnail:[],
    images:[]
})

const product = mongoose.model('product',productModel)
module.exports = product;