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
            productCreate('Toy1', 'This is the description of the toy1', 5, '/img/toy1.jpg', 20);
        },
        function(callback){
            productCreate('Toy2', 'This is the description of the toy2', 10, '/img/toy2.jpg', 22);
        },
        function(callback){
            productCreate('Toy3', 'This is the description of the toy3', 15, '/img/toy3.jpg', 30);
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
