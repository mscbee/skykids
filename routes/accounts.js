var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

    router.use(bodyParser.urlencoded({ extended: true }))
    router.use(methodOverride(function(req, res){
          if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method
            delete req.body._method
            return method
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
