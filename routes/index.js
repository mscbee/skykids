var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message: 'Welcome to express',
names: ['Conor', 'Luke', 'Charlene', 'Sandi', 'Lisa', 'Alex', 'Jas'] });
});

module.exports = router;
