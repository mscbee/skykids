var Product = require('../model/product');
var mongoose = require('mongoose');

// Original route to homepage - kept for reference
// exports.index = function(req, res){
//     res.render('../views/catalog.ejs', { title: 'Catalog', message: 'Welcome to the SkyKids store',
//     names: ['products', 'basket', 'account'] });
// }

// exports.index = function(req, res){
//     res.render('/', { product: 'Toy', description: 'Description: Welcome to the SkyKids store',
//     price: '£20', list: ['products', 'basket', 'account'] });
// }

exports.index = function(req, res){
    res.render('catalog', { product: 'Toy', description: 'Description: Welcome to the SkyKids store',
    price: '£20', list: ['products', 'basket', 'account'] });
}


// var products = Product.find();
// return products;

// Original Display list of all products - kept for reference
// exports.product_list = function(req, res){
//     res.send('NOT IMPLEMENTED: Product list');
// }

// Display list of all products
exports.product_list = function(req, res){

  Product.find({})
    .exec(function(err, products) {
      console.log(products);
      res.send("");
    })

  //res.send(db);
  // Product.find({}, function(err,products){
  //   console.log(products);
  //   res.send(products);
    // var productMap = {};
    // products.forEach(function(product){
    //   productMap[product._id] = product;
    // });
    //
    // res.send(productMap);
  // });
  //  res.send('NOT IMPLEMENTED: Product list');
}

// Display detail page for a specific product
exports.product_detail = function(req, res){
    res.send('NOT IMPLEMENTED: Product detail ' + req.param.id);
}

// Display product create form in GET
exports.product_create_get = function(req, res){
    res.send('NOT IMPLEMENTED: Product create GET');
}

// Handle product create on POST
exports.product_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: Product create POST');
}

// Display product delete on GET
exports.product_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: Product delete GET');
}

// Handle product delete on POST
exports.product_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: Product delete POST');
}

// Display product update form on GET
exports.product_update_get = function(req, res){
    res.send('NOT IMPLEMENTED: Product update POST');
}

// Handle product update on POST
exports.product_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: Product update POST');
}
