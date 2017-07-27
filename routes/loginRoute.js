var express = require('express');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

/// LOGIN ROUTES ///

//GET request to Render the login page
router.get('/', user_controller.index);

//POST request to check the user credentials
router.post('/', user_controller.check);

//POST to reset email address
router.post('/reset', user_controller.resetPassword);

module.exports = router;