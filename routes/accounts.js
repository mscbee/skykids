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
    //POST a new blob
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
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(account);
                    }
                });
              }
        })
    });

// GET New Blob page.
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
