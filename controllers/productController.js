var Product = require('../model/product');

// Route to homepage and display all products
exports.index = function(req, res){
  Product.find({}, (function(err,doc){
    var productList = [];
    doc.forEach(function(one){
      productList[doc] = doc;
    })
    res.render('../views/catalog.ejs',{doc, cart: req.session.cart});
    console.log(doc);
  }));
};

// Display list of all products
exports.product_list = function(req, res){
  res.send('NOT IMPLEMENTED: Product list');
}


// Display detail page for a specific product
exports.product_index = function(req, res){
  var productId = req.params.id;
   Product.findOne({_id: productId}, function(err,doc) {
     res.render('../views/product.ejs',{doc: doc, cart: req.session.cart});
  });
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
