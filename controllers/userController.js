const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

module.exports.signup = async function (req, res) {
    try {
        let { number, name, password } = req.body;
        if (!number || !name || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const user = await userModel.findOne({ number: req.body.number });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        let hash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ number, password: hash, name });
        return res.status(200).json({
            message: "User created successfully",
            data: newUser
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in creating user",
            error: err.message
        })
    }
}

module.exports.login = async function (req, res) {
    try {
        let { number, password } = req.body;
        if (!number || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const user = await userModel.findOne({ number: req.body.number });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            })
        }
        res.cookie("login", true, { httpOnly: true });
        return res.status(200).json({
            message: "Login successful",
            data: user
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in logging in",
            error: err.message
        })
    }
}

module.exports.logout = function logout(req, res) {
    res.cookie('login', ' ', { maxAge: 1 });
    res.json({
        message: "user logged out succesfully"
    });
}

module.exports.addToCart = async function (req, res) {
    try {
        const user = await userModel.findById(req.body.userId);
        const product = await productModel.findById(req.body.productId);
        if (!product || !user) {
            return res.status(400).json({
                message: "Product/User does not exist"
            })
        }
        // let present = user.cart.find(element => element.productId == req.body.productId );
        // if(present){
        //     user.cart = user.cart.map(element => element.productId == req.body.productId ? {productId: element.productId, quantity: element.quantity+1} : element)
        // }else{
        user.cart.push({
            _id: product._id,
        });
        await user.save();
        res.status(200).json({
            message: "Product added to cart successfully",
            cart: user.cart
        })
    } catch (err) {
        res.status(400).json({
            message: "Error in adding to cart",
            error: err.message
        })
    }
}


module.exports.placeOrder = async function (req, res) {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }
        if (user.cart.length == 0) {
            return res.status(400).json({
                message: "Cart is empty"
            })
        }
        let order = await orderModel.create({ products: user.cart });
        user.cart = [];
        await user.save();
        res.status(200).json({
            message: "Order placed successfully",
            order: order
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in placing order",
            error: err.message
        })
    }
}

module.exports.addToWishlist = async function (req, res) {
    try {
        const user = await userModel.findById(req.body.userId);
        const product = await productModel.findById(req.body.productId);
        if (!product || !user) {
            return res.status(400).json({
                message: "Product/User does not exist"
            })
        }
        user.wishlist.push({
            _id: product._id,
        });
        await user.save();
        res.status(200).json({
            message: "Product added to wishlist successfully",
            wishlist: user.wishlist
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in adding to wishlist",
            error: err.message
        })
    }
}