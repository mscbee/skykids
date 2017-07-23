var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

var routes = require('./routes/index');
var blobs = require('./routes/accounts');

app.use('/', routes);
app.use('/accounts', accounts);
