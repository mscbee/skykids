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

cartController.removeFromCart = function(req, res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cartProducts = cart.generateArray();

    for(var i = 0; i < cartProducts.length; i++){
        if(cartProducts[i].product._id == productId){
            cart.totalPrice -= cartProducts[i].price;
            cart.totalQty -= cartProducts[i].qty;
            cartProducts.splice(i, 1);
        }
    }

    var productsObj = cartProducts.reduce(function(acc, cur, i){
        acc[i] = cur;
        return acc;
    }, {}); 

    cart.products = productsObj;
    req.session.cart = cart;
    res.send(req.session.cart);
}

cartController.updateCart = function(req, res){
    var productId = req.params.id;
    var quantity = req.params.quantity;

    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cartProducts = cart.generateArray();

}

module.exports = cartController;
