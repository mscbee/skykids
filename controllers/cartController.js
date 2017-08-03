var Cart = require('../model/cart');
var Product = require('../model/product');
var Order = require('../model/order');
var twilio = require('twilio');
var cartController = {};
var vrController = require('../controllers/vrController');

cartController.index = function(req, res){
    if (!req.session.cart) {
       return res.render('cart', { products: null, cart: req.session.cart });
   }
  var cart = new Cart(req.session.cart);
  res.render('cart', { title: "Cart", products: cart.generateArray(), totalPrice: cart.totalPrice, totalQuantity: cart.totalQty, cart: req.session.cart});
}

cartController.vrIndex =  function(req, res){
  var vrCart = vrController.getVrCart();
  if(vrCart){
    req.session.vrCart = vrCart;
  }
    if (!req.session.vrCart) {
      console.log("no vr cart");
       return res.render('cart', { products: null, cart: req.session.vrCart });
   }
  var cart = new Cart(req.session.vrCart);
  res.render('cart', { title: "Cart", products: cart.generateArray(), totalPrice: cart.totalPrice, totalQuantity: cart.totalQty, cart: req.session.vrCart});
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
        backURL=req.header('Referer') || '/cart';
        res.redirect(backURL);
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
    var quantity = parseInt(req.params.quantity);

    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.updateByQty(productId, quantity);
    req.session.cart = cart;
    res.redirect('/cart');
}

cartController.showCheckout = function(req, res){
    // if (!req.session.cart) {
    //     return res.redirect('/cart');
    // }
    // var cart = new Cart(req.session.cart);
    //var errMsg = req.flash('error')[0];
    res.render('payment' , {cart: req.session.cart}); // Render payment view?
}

cartController.processPayment = function(req, res){
  var customerId = req.user.id;
  var products = req.session.cart.products;
  var productsArray = [];
  var totalQty = req.session.cart.totalQty;
  var address = req.body.shippingAddress;
  var orderStatus = 'orderPlaced';

  req.checkBody('phoneNumber','Please enter phone number').notEmpty();
  req.checkBody('shippingAddress', 'Please enter valid address').notEmpty();

  var phoneNumber = req.body.phoneNumber;
  var accountSid = 'AC2fea5b00e75f029c0bb8657e9a5e0c32'; // Your Account SID from www.twilio.com/console
  var authToken = '3985d5a411a88bf2a248f7e6eb313ee9';   // Your Auth Token from www.twilio.com/console

  productsArray.push(products);

  var client = new twilio(accountSid, authToken);

  client.messages.create({
      body: 'Thanks for your order!',
      to: '+44'+ phoneNumber,  // Text to the number from form
      from: '+441158246021' // From a valid Twilio number
    })

    var order = new Order({customerId: customerId, shippingAddress: address,
                            products: productsArray, quantity: totalQty, orderStatus: orderStatus});

    order.save(function(err){
        if(err){
            console.log(err);
            return;
        }
    })

    res.redirect('/payment-success'); // Send to payment process page?
}

cartController.paymentSuccess = function(req, res){
    res.render('paymentSuccess', {cart: req.session.cart});
}

module.exports = cartController;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('login');
}
