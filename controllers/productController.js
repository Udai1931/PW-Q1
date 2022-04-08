const productModel = require("../models/productModel");

module.exports.createProduct = async(req, res) => {
    try{
        let {name, price, description} = req.body;
        if(!name || !price || !description){
            throw new Error("Name, price and description are required.");
        }
        const product = new productModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        });
        const newProduct = await product.save();
        res.status(200).json({
            message: "Product created successfully",
            newProduct
        });
    }catch(err){
        res.status(500).json({
            err : err.message
        })
    }
}

module.exports.getProducts = async(req, res) => {
    try{
        const products = await productModel.find({});
        res.status(200).json({
            message: "Products fetched successfully",
            products});
    }catch(err){
        res.status(500).json({
            err : err.message
        })
    }
}

module.exports.addReview = async(req, res) => {
    try{
        if(!req.body.review){
            throw new Error("Add review first.");
        }
        const product = await productModel.findById(req.params.id);
        if(!product){
            throw new Error("Product does not exist.");
        }
        product.review.push(req.body.review);
        await product.save();
        res.status(200).json({
            message: "Review added successfully",
            product
        });
    }catch(err){
        res.status(500).json({
            err : err.message
        })
    }
}

module.exports.addRating = async(req, res) => {
    try{
        if(!req.body.rating){
            throw new Error("Add rating first.");
        }
        const product = await productModel.findById(req.params.id);
        if(!product){
            throw new Error("Product does not exist.");
        }
        product.rating.push(req.body.review);
        await product.save();
        res.status(200).json({
            message: "Rating added successfully",
            product
        });
    }catch(err){
        res.status(500).json({
            err : err.message
        })
    }
}