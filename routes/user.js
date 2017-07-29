var express = require('express');
var passport = require('passport');
var Customer = require('../model/customer');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

/// DEFAULT TO CATALOG ///

router.get('/', user_controller.index);

///Register ROUTEs ///

//Router to render register view
router.get('/register', user_controller.register);

//Router to perform registration check
router.post('/register', user_controller.doRegister);

/// LOGIN ROUTES ///

//GET request to Render the login page
router.get('/login', user_controller.login);

//POST request to check the user credentials
router.post('/login', passport.authenticate('local', { session: true }), user_controller.doLogin);

//POST request to logout
router.get('/logout', user_controller.logout);

//POST to reset email address
router.post('/reset', user_controller.resetPassword);

module.exports = router;
