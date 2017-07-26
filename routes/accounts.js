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
                        res.render('accounts/new',
                          {
                              title: 'Register an account',
                              "accounts" : accounts
                          });
                    }
                    //JSON response will show all blobs in JSON format

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
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new item in the req
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
          }
        });
      }
    });
  });

//GET the individual account by Mongo ID
router.get('/:id/edit', function(req, res) {
    //search for the account within Mongo
    mongoose.model('Account').findById(req.id, function (err, account) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return account
            console.log('GET Retrieving ID: ' + account._id);
            //format the date properly for the value to show correctly in our edit form
          var accountdob = account.dob.toISOString();
          accountdob = accountdob.substring(0, accountdob.indexOf('T'))
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('accounts/edit', {
                          title: 'Account' + account._id,
                        "accountdob" : accountdob,
                          "account" : account
                      });
                 },
                 //JSON response will return the JSON output
                json: function(){
                       res.json(account);
                 }
            });
        }
    });
});

//PUT to update a blob by ID
router.put('/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var address = req.body.address;
    var postcode = req.body.postcode;
    var phoneNumber = req.body.phoneNumber;
    var dob = req.body.dob;

   //find the document by ID
        mongoose.model('Account').findById(req.id, function (err, account) {
            //update it
            account.update({
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : password,
                confirmPassword : confirmPassword,
                address : address,
                postcode : postcode,
                phoneNumber : postcode,
                dob : dob
            }, function (err, accountID) {
              if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
              }
              else {
                      //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                      res.format({
                          html: function(){
                               res.redirect("/accounts/" + account._id);
                         },
                         //JSON responds showing the updated values
                        json: function(){
                               res.json(account);
                         }
                      });
               }
            })
        });
});


//DELETE an account by ID
router.delete('/:id/edit', function (req, res){
    //find an account by ID
    mongoose.model('Account').findById(req.id, function (err, account) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            account.remove(function (err, account) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + account._id);
                    res.format({
                          html: function(){
                               res.redirect("/accounts");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : account
                               });
                         }
                      });
                }
            });
        }
    });
});

module.exports = router;
