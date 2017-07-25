var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the schema
var ProductSchema = Schema(
  {
    productName: {type: String, required: true, max: 100},
    productDescription: {type: String, required: true},
    productColour: {type: String},
    productDimensionW: {type: Number},
    productDimensionY: {type: Number},
    productDimensionH: {type: Number},
    productWeight: {type: Number},
    productStockLevel: {type: Number, required: true},
    productImage: {type: String, required: true},
    productPrice: {type: Number, required: true}
  }
);

// Return the url for single product
ProductSchema
.virtual('url')
.get(function(){
  return '/catalogue/product' + this._id;
})

//Export model
module.exports = mongoose.model('Product', ProductSchema);