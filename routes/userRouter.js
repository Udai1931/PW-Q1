const express = require('express');
const { signup, login, logout, addToCart, placeOrder, addToWishlist } = require('../controllers/userController');
const router = express.Router();

router.route('/signup')
.post(signup)

router.route('/login')
.post(login)

router.route('logout')
.get(logout)


router.route('/products')
.post(addToCart);

router.route('/order')
.get(placeOrder)

router.route('/addtowishlist')
.post(addToWishlist)

module.exports = router;

