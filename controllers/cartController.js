var Cart = require('../model/cart');
var Product = require('../model/product');
var cartController = {};

cartController.index = function(req, res){
    if (!req.session.cart) {
       return res.render('cart', { products: null });
   } 
  var cart = new Cart(req.session.cart);
  res.render('cart', { products: cart.generateArray(), totalPrice: cart.totalPrice})
}

cartController.addToCart = function(req, res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.send('no product');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.send(req.session.cart);
    });
}

// Reduces cart by one currently
cartController.reduceCart = function(req, res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
}

cartController.removeFromCart = function(req, res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
}

cartController.updateCart = function(req, res){
    var productId = req.params.id;
    var quantity = req.params.quantity;

    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cartProducts = cart.generateArray();

}

module.exports = cartController;
