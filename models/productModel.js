const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    review : [{
        type: String,
    }],
    rating : [{
        type: Number,
    }]
},{timestamps:true})

const productModel = mongoose.model('productModel', productSchema);

module.exports = productModel;