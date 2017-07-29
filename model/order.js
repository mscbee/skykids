var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Define the Schema

var OrderSchema = Schema (

  {
    orderId: { type:Number, required:true},
    dateCreated: {type:Number, required:true}, // check the data type for date
    shippingAddress: {type:String, required:true},
    customerId: {type:String, required:true},
    orderStatus: {type:String, required:true}
  }

);

//Export model
module.exports = mongoose.model('Order', OrderSchema);
