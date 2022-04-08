const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: []
},{timestamps:true})

const orderModel = mongoose.model('orderModel', orderSchema);

module.exports = orderModel;