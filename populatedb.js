#! /usr/bin/env node

console.log('This script populates some test products, users into the database. Specfied database as arguement - e.g populatedb mongodb://localhost:27017/skykids_shop');

// Get arguements passed on command line 
var userArgs = process.argv.slice(2);

if(!userArgs[0].startsWith('mongodb://')){
    console.log('Error: You need to specify a valid mongodb URL as the first argument');
}

var async = require('async');
var Product = require('./model/product');
//var User = require('./models/user');

// Create connection and listen for errors
var mongoose = require('mongoose');
var mongodb = userArgs[0];
mongoose.connect(mongodb);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//var users = [];
var products = [];

// function userCreate(firstName, lastname, emailAddress, addressLine1, addressLine2, town, postcode, phoneNumber, dateOfBirth, loyaltyStatus, callback){
//     userdetail = {firstName:firstName, lastname:lastname, emailAddress:emailAddress,
//                   addressLine1:addressLine1, addressLine2:addressLine2, town:town,
//                   postcode:postcode, phoneNumber:phoneNumber, dateOfBirth:dateOfBirth, loyaltyStatus}
    
//     if(dateOfBirth != false) userdetail.dateOfBirth = dateOfBirth;
    
//     var user = new User(userdetail);

//     user.save(function (err) {
//         if(err) {
//             callback(err, null);
//             return;
//         }
//         console.log('New User: ' + user);
//         users.push(user);
//         callback(null, user);
//     });

// }

function productCreate(productName, productDescription, productColour, productDimensionW, productDimensionY, productDimensionH, productWeight, productStockLevel, productImage, productPrice, callback){
    productdetail = {
        productName: productName,
        productDescription: productDescription,
        productColour: productColour,
        productDimensionW: productDimensionW,
        productDimensionY: productDimensionY,
        productDimensionH: productDimensionH,
        productWeight: productWeight,
        productStockLevel: productStockLevel,
        productImage: productImage,
        productPrice: productPrice
    }

    var product = new Product(productdetail);

    product.save(function (err) {
        if(err) {
            callback(err, null);
            return;
        }
        console.log('New Product: ' + product);
        products.push(product);
        callback(null, product);
    });

}

// function createUsers(cb){
//     async.parallel([
//         function(callback){
//             userCreate('Conor', 'Okus', 'myaddress@gmail.com', '7 Mile Street', 'Manford Way', 'London', 'E11 2JF', 111111111111, '15/09/1991', true, callback);
//         },
//         function(callback){
//             userCreate('Lisa', 'Jarman', 'anotheraddress@gmail.com', '7 Silly Street', 'That Way', 'London', 'E11 XXX', 22222111111, '15/05/1995', true, callback);
//         },
//         function(callback){
//             userCreate('Jimmy', 'Cheong', 'myaddressjimmy@gmail.com', '11 Queen Road', 'Brent Cross', 'Essex', 'RM6 4QJ', 33333311111, '12/11/1992', true, callback);
//         }
//     ], cb); // optional callback
// }

function createProducts(cb){
    async.parallel([
        function(callback){
            productCreate('Toy1', 'This is the description of the toy1', 'red', 100, 100, 100, 200, 5, '/img/toy1.jpg', 20, callback);
        },
        function(callback){
            productCreate('Toy2', 'This is the description of the toy2', 'blue', 105, 105, 105, 400, 10, '/img/toy2.jpg', 22, callback);
        },
        function(callback){
            productCreate('Toy3', 'This is the description of the toy3', 'purple', 200, 200, 200, 200, 15, '/img/toy3.jpg', 30, callback);
        }
    ], cb); // optional callback
}


async.series ([
    createProducts
],
function(err, results){
    if(err) {
        console.log('FINAL ERR: ' + err);
    } else {
        console.log('Products: ' + products);
    }
    //All done, disconnect from database
    mongoose.connection.close();
});

