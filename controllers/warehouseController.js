var Order = require('../model/order');

var warehouseController = {};

warehouseController.index = function(req, res){

  Order.find({},function(err,orders){
    if (!err){
      res.render('warehouse',{orders: orders});
    }
    else {
      console.log(err);
    }
  })
}

module.exports = warehouseController;
