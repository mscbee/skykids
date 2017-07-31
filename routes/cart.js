var express = require('express');
var Cart = require('../model/cart');
var router = express.Router();

// Require controller modules
var cart_controller = require('../controllers/cartController');

///  Register Cart ///

//Router to render cart view
router.get('/cart', cart_controller.index);

//Router to perform cart operation
router.get('/cart/:id', cart_controller.addToCart);

router.get('/cart-remove/:id', cart_controller.removeFromCart);



module.exports = router;
