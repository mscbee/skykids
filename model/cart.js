var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//define schema

var CartSchema = Schema(
  {
    cartId: {type: Number, required: true},
    productId: {type: Number, required: true},
    quantity: {type: Number, required: true}
  }
);


module.exports = mongoose.model('Cart', CartSchema);
