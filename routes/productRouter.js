const express = require('express');
const { createProduct, getProducts, addRating, addReview } = require('../controllers/productController');
const router = express.Router();

router.route('/')
.post(createProduct)
.get(getProducts)


router.route("/addrating/:id")
.post(addRating)

router.route("/addreview/:id")
.post(addReview)

module.exports = router;