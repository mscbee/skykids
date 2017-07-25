var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

<<<<<<< HEAD
    router.use(bodyParser.urlencoded({ extended: true }))
    router.use(methodOverride(function(req, res){
          if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method
            delete req.body._method
            return method
=======
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/')
    //GET all accounts
    .get(function(req, res, next) {
        //retrieve all accounts from Monogo
        mongoose.model('Account').find({}, function (err, accounts) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('accounts/index', {
                              title: 'Register an account',
                              "accounts" : accounts
                          });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(infophotos);
                    }
                });
              }
        });
    })
    //POST a new account
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var confirmPassword = req.body.confirmPassword;
        var address = req.body.address;
        var postcode = req.body.postcode;
        var phoneNumber = req.body.phoneNumber;
        var dob = req.body.dob;
        //validation
        req.checkBody('firstName','First Name is required').notEmpty();
        req.checkBody('lastName','Last Name is required').notEmpty();
        req.checkBody('email','Email is required').notEmpty();
        req.checkBody('password','Password is required').notEmpty();
        req.checkBody('confirmPassword','Confirmation of password is required').notEmpty();
        req.checkBody('address','Address is required').notEmpty();
        req.checkBody('postcode','PostCode is required').notEmpty();
        req.checkBody('phoneNumber','Phone Number is required').notEmpty();
        req.checkBody('dob','Date of birth is required').notEmpty();
        //call the create function for our database
        mongoose.model('Account').create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            confirmPassword : confirmPassword,
            address : address,
            postcode : postcode,
            phoneNumber : postcode,
            dob : dob
        }, function (err, account) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //account has been created
                  console.log('Creating new account: ' + account);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("accounts");
                        // And forward to success page
                        res.redirect("/accounts");
                    },
                    //JSON response will show the newly created account
                    json: function(){
                        res.json(account);
                    }
                });
              }
        })
    });

// GET New account page.
router.get('/new', function(req, res) {
    res.render('accounts/new', { title: 'Add New Account' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Account').findById(id, function (err, account) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

//GET an individual account by ID to display
router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Account').findById(req.id, function (err, account) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + account._id);
        var accountdob = account.dob.toISOString();
        accountdob = accountdob.substring(0, accountdob.indexOf('T'))
        res.format({
          html: function(){
              res.render('accounts/show', {
                "accountdob" : accountdob,
                "account" : blob
              });
          },
          json: function(){
              res.json(account);
>>>>>>> d3cc7b068497fd945b0b31a3b0f0ec733fcf938a
          }
    }))

    //build the REST operations at the base for blobs
    //this will be accessible from http://127.0.0.1:3000/blobs if the default route for / is left unchanged
    router.route('/')
        //GET all blobs
        .get(function(req, res, next) {
            //retrieve all blobs from Monogo
            mongoose.model('Account').find({}, function (err, accounts) {
                  if (err) {
                      return console.error(err);
                  } else {
                      //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                      res.format({
                          //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                        html: function(){
                            res.render('accounts/index', {
                                  title: 'All my Users',
                                  "accounts" : accounts
                              });
                        },
                        //JSON response will show all blobs in JSON format
                        json: function(){
                            res.json(infophotos);
                        }
                    });
                  }
            });
        })
        //POST a new blob
        .post(function(req, res) {
            // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
            var firstName = req.body.firstName;
            var lastName = req.body.lastName;
            var email = req.body.email;
            var password = req.body.password;
            var confirmPassword = req.body.confirmPassword;
            var address1 = req.body.address1;
            var address2 = req.body.address2;
            var town = req.body.town;
            var county = req.body.county;
            var postcode = req.body.postcode;
            var country = req.body.country;
            var phoneNumber = req.body.phoneNumber;
            var dob = req.body.dob;

            //validation
            req.checkBody('firstName','First Name is required').notEmpty();
            req.checkBody('lastName','Last Name is required').notEmpty();
            req.checkBody('email','Email is required').notEmpty();
            req.checkBody('password','Password is required').notEmpty();
            req.checkBody('confirmPassword','Confirmation of password is required').notEmpty();
            req.checkBody('address','Address is required').notEmpty();
            req.checkBody('postcode','PostCode is required').notEmpty();
            req.checkBody('phoneNumber','Phone Number is required').notEmpty();
            req.checkBody('dob','Date of birth is required').notEmpty();

            //call the create function for our database
            mongoose.model('Account').create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                address1: address1,
                address2: address2,
                town: town,
                county: county,
                postcode: postcode,
                country: country,
                phoneNumber : phoneNumber,
                dob : dob,

            }, function (err, account) {
                  if (err) {
                      res.send("There was a problem adding the information to the database.");
                  } else {
                      //Blob has been created
                      console.log('POST creating new account: ' + account);
                      res.format({
                          //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                        html: function(){
                            // If it worked, set the header so the address bar doesn't still say /adduser
                            res.location("accounts");
                            // And forward to success page
                            res.redirect("/accounts");
                        },
                        //JSON response will show the newly created blob
                        json: function(){
                            res.json(account);
                        }
                    });
                  }
            })
        });

        /* GET New Blob page. */
router.get('/new', function(req, res) {
    res.render('accounts/new', { title: 'Add New Blob' });
});



module.exports = router;
