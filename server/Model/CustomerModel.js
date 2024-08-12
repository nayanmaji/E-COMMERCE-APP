const mongoose = require('mongoose');

const customerModel = mongoose.Schema({
    c_id : {
        type : Number,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password :{
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    }

})

const customer = mongoose.model('customer',customerModel)
module.exports = customer;