var express = require('express');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

/// REGISTER ROUTES ///

//GET request to Render the register page
router.get('/', user_controller.index);

//POST request to check the user credentials
router.post('/', user_controller.check);

module.exports = router;
