var express = require('express');
var passport = require('passport');
var router = express.Router();

// Require controller modules
var vr_controller = require('../controllers/vrController');

///  Register vr ///

//Router to perform registration check
router.post('/', vr_controller.vrController.sendOrder);

module.exports = router;
