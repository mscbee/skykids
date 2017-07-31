var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the schema
var ProductSchema = Schema(
  {
    productName: {type: String, required: true, max: 100},
    productDescription: {type: String, required: true},
    productStockLevel: {type: Number, required: true},
    productImage: {type: String, required: true},
    productPrice: {type: Number, required: true}
  }
);

//Export model
module.exports = mongoose.model('Product', ProductSchema);
