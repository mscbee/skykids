var express = require('express');
var router = express.Router();

// Require controller modules
var product_controller = require('../controllers/productController');
//var user_controller = require('../controllers/userController');

/// PRODUCT ROUTES ///

/* GET catalog home page. */
router.get('/', product_controller.index);

/* GET request for creating a Product. NOTE This must come before routes that display Product (uses id) */
router.get('/product/create', product_controller.product_create_get);

/* POST request for creating Product. */
router.post('/product/create', product_controller.product_create_post);

/* GET request to delete Product. */
router.get('/product/:id/delete', product_controller.product_delete_get);

// POST request to delete Product
router.post('/product/:id/delete', product_controller.product_delete_post);

/* GET request to update Product. */
router.get('/product/:id/update', product_controller.product_update_get);

// POST request to update Product
router.post('/product/:id/update', product_controller.product_update_post);

/* GET request for one Product. */
router.get('/product/:id', product_controller.product_detail);

/* GET request for list of all Book items. */
router.get('/product', product_controller.product_list);

module.exports = router;
