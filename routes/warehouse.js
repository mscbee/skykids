var express = require('express');
var Order = require('../model/order');
var router = express.Router();

// Require controller modules
var warehouse_controller = require('../controllers/warehouseController');

//Router to render warehouse view
router.get('/warehouse', warehouse_controller.index);

module.exports = router;
