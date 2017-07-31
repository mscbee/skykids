#! /usr/bin/env node

console.log('This script populates some test products, users into the database. Specfied database as arguement - e.g populatedb mongodb://localhost:27017/skykids_shop');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if(!userArgs[0].startsWith('mongodb://')){
    console.log('Error: You need to specify a valid mongodb URL as the first argument');
}

// Require async and models
var async = require('async');
var Product = require('./model/product');
var Customer = require('./model/customer');

// Create connection and listen for errors
var mongoose = require('mongoose');
var mongodb = userArgs[0];

// If database doesn't exist mongoose will create one for you!
mongoose.connect(mongodb);

// Drop the database if it exists
mongoose.connection.once('connected', () => {
    mongoose.connection.db.dropDatabase();
});

// Listen for db errors
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Store hard coded values for database insertion
var customers = [];
var products = [];

function customerCreate(username, firstName, lastName, email, password, phoneNumber, addressLine1, addressLine2, postcode){
    customerdetail = {username: username, firstName:firstName, lastName:lastName, email:email, password:password,
    phoneNumber: phoneNumber, addressLine1: addressLine1, addressLine2: addressLine2, postcode: postcode };

    var customer = new Customer(customerdetail);

    customer.save(function (err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('New Customer: ' + customer);
        customers.push(customer);
    });

 }

// Takes in all model properties, creates product, save product to database
function productCreate(productName, productDescription, productStockLevel, productImage, productPrice){
    productdetail = {
        productName: productName,
        productDescription: productDescription,
        productStockLevel: productStockLevel,
        productImage: productImage,
        productPrice: productPrice
    }

    var product = new Product(productdetail);

    product.save(function (err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('New Product: ' + product);
        products.push(product);
    });

}

function createCustomers(cb){
    async.parallel([
        function(callback){
            customerCreate('M','Michael', 'Lewis', 'micheal.lewis@gmail.com,', 'sdqwdqde', '07772233434343', '6 Lew St', 'London', 'E11 2JF');
        },
        function(callback){
            customerCreate('J','John', 'Wilkins', 'john.wilkins@gmail.com,', 'sdewrweqde', '0777243', '6 sdwsdw St', 'Birmoingham', 'BM1 2JT');
        },
        function(callback){
            customerCreate('S','Steve', 'Lomas', 'steve.lewis@gmail.com,', 'sdqsfdswdqde', '07772233434343', '6 Kings', 'Brighton', 'T11 2FF');
        }
    ], cb); // optional callback
}

// Enter mulitple products simultaneously?
function createProducts(cb){
    async.parallel([
        function(callback){
            productCreate('Blossom', 'This is brand new 13 inch Powerpuff Blossom doll ideal for great gifts', 5, '/images/blossom.jpg', 5);
        },
        function(callback){
            productCreate('Bubbles', 'This is brand new 13 inch Powerpuff Bubbles doll ideal for great gifts', 8, '/images/bubbles.jpg', 5);
        },
        function(callback){
            productCreate('Buttercup', 'This is brand new 13 inch Powerpuff Buttercup doll ideal for great gifts', 10, '/images/buttercup.jpg', 5);
        },
        function(callback){
            productCreate('Buzz', 'Favorite character from Disney/Pixar Toy Story really talks back.Wears movie inspired outfit and has big personality details.', 20, '/images/buzz.jpg', 15);
        },
        function(callback){
            productCreate('Dora', 'This is imported Ty wildly popular Beanie Babies Collection', 15, '/images/dora.jpg', 8);
        },
        function(callback){
            productCreate('Kion', 'This features motorized roaring action with a mechanical leaping action Kion!Squeeze Kion belly to trigger raging roar', 9, '/images/kion.jpg', 11);
        },
        function(callback){
            productCreate('Olaf', 'Sing along with Olaf the snowman from the Disney movie Frozen!He will also say some of his funniest phrases from the movie!A great gift for Disney Frozen fans!', 5, '/images/olaf.jpg', 20);
        },
        function(callback){
            productCreate('Pawpatrol', 'This doll is perfect for little hands to hold and pretend play or even trade them.', 12, '/images/pawpatrol.jpg', 10);
        },
        function(callback){
            productCreate('Peppa', 'This is Polyester fibers Imported handmade doll with the finest quality standards in the industry', 22, '/images/peppa.jpg', 7);
        },
        function(callback){
            productCreate('Po', 'Dance and sing along with this adorable Po soft toy! Gently squeeze Pos hand to change between talking & dancing modes. Po plays the Teletubbies theme tune', 30, '/images/po.jpg', 14);
        },
        function(callback){
            productCreate('Sofia', 'Meet Sofia, the Princess of Enchancia!Sofia is the only Princess with a magical amulet that lets her speak to the animals in the kingdom', 13, '/images/sofia.jpg', 26);
        },
        function(callback){
          productCreate('Walle', 'This is brand new 13 inch Powerpuff Blossom doll ideal for great gifts', 5, '/images/walle.jpg', 5);
            //productCreate('Walle', 'Walle quickly transforms from cube to fully poseable figure in seconds, ready to clean up the world. Simply press 'n' pop action releases his track wheels', 5, '/images/walle.jpg', 20);
        }
    ], cb); // optional callback
}

// Run all functions simultaneously e.g createProducts, createUsers etc
async.parallel ([
    createProducts,
    createCustomers
],
function(err, results){ // optional callback for errors
    if(err) {
        console.log('FINAL ERR: ' + err);
    } else {
        console.log('Products: ' + products);
    }
    //All done, disconnect from database
    mongoose.connection.close();
});
