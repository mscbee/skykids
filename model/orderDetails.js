var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Define the Schema

var OrderDetailsSchema = Schema(
  {
    orderId: { type:Number, required:true},
    productId: { type:Number, required:true},
    quantity: { type:Number, required:true}
  }
);

//Export model
module.exports = mongoose.model('OrderDetails',OrderDetailsSchema);
