const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    number:{
        type: String,
        required: true,
        unique: true,
        minlength:[10,"number must be 10 digits long"]
    },
    name:{
        type: String,
        default:'',
    },
    password:{
        type: String,
        required: true,
        minlength:[6,"Password should be greater than 5"]
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'productModel'
    }],
    order:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "orderModel"
    }],
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "productModel"
    }]
    // order:[] order model
    //product model => review,rating
    // whislist
    
},{timestamps:true});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel