var express = require('express');
var Cart = require('../model/cart');
var router = express.Router();

// Require controller modules
var cart_controller = require('../controllers/cartController');

///  Register Cart ///

//Router to render cart view
router.get('/cart', cart_controller.index);

//Router to perform cart operation
router.get('/add-to-cart/:id', cart_controller.addToCart);

router.get('/cart-reduce/:id', cart_controller.reduceCart);

router.get('/cart-remove/:id', cart_controller.removeFromCart);

router.get('/cart-update/:id/:quantity', cart_controller.updateCart);

router.get('/checkout', cart_controller.showCheckout);

router.post('/checkout', cart_controller.doCheckout);






module.exports = router;