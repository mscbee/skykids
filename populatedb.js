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
var WarehouseEmployee = require('./model/warehouseEmployee');

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
var warehouseEmployees = [];

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

// Takes in all model properties, create employees, save employees to database
function warehouseEmployeeCreate(username, firstName, lastName, email, password){
    warehouseEmployeeDetail = {username: username, firstName:firstName, lastName:lastName, email:email, password:password};

    var warehouseEmployee = new WarehouseEmployee(warehouseEmployeeDetail);

    warehouseEmployee.save(function (err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('New Warehouse Employee: ' + warehouseEmployee);
        warehouseEmployees.push(warehouseEmployee);
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
            productCreate('Blossom', 'Brand new 13 inch Powerpuff Girls Blossom doll. Makes an ideal gift!', 5, '/images/blossom.jpg', 5);
        },
        function(callback){
            productCreate('Bubbles', 'New 13 inch Powerpuff Girls Bubbles doll - great as a gift for a Powerpuff fan!', 8, '/images/bubbles.jpg', 5);
        },
        function(callback){
            productCreate('Buttercup', 'A brand new 13 inch Powerpuff Girl doll, Buttercup is a great gift!', 10, '/images/buttercup.jpg', 5);
        },
        function(callback){
            productCreate('Buzz Lightyear', 'A favourite character from Disney/Pixar\'s Toy Story that really talks back! Wears movie-inspired outfit and has a big personality!', 20, '/images/buzz.jpg', 15);
        },
        function(callback){
            productCreate('Dora', 'Dora The Explorer toy from the wildly popular Beanie Babies Collection.', 15, '/images/dora.jpg', 8);
        },
        function(callback){
            productCreate('Kion', 'Features motorised roaring action with a mechanical leaping action! Squeeze Kion\'s belly to trigger a raging roar.', 9, '/images/kion.jpg', 11);
        },
        function(callback){
            productCreate('Olaf', 'Sing along with Olaf the snowman from Disney\'s Frozen! He will also say some of his funniest phrases from the movie! A great gift for Disney Frozen fans!', 5, '/images/olaf.jpg', 20);
        },
        function(callback){
            productCreate('Paw Patrol', 'No job is too big for a group of rescue puppies who work together to protect the community.', 12, '/images/pawpatrol.jpg', 10);
        },
        function(callback){
            productCreate('Peppa Pig', 'Every day is an adventure for Peppa Pig! With her family and friends there\'s always something to smile about, and a whole world of things to discover.', 22, '/images/peppa.jpg', 7);
        },
        function(callback){
            productCreate('Po', 'Dance and sing along with this adorable Po soft toy! Gently squeeze Po\'s hand to change between talking and dancing modes. Po also plays the Teletubbies theme tune.', 30, '/images/po.jpg', 14);
        },
        function(callback){
            productCreate('Sofia', 'Meet Sofia, the Princess of Enchancia! Sofia is the only Princess with a magical amulet that lets her speak to the animals in the kingdom.', 13, '/images/sofia.jpg', 26);
        },
        function(callback){
          productCreate('WALL-E', 'WALL-E quickly transforms from cube to fully poseable figure in seconds, ready to clean up the world. A Simple press \'n\' pop action releases his track wheels.', 5, '/images/walle.jpg', 5);
            //productCreate('Walle', 'Walle quickly transforms from cube to fully poseable figure in seconds, ready to clean up the world. Simply press 'n' pop action releases his track wheels', 5, '/images/walle.jpg', 20);
        }
    ], cb); // optional callback
}



function createWarehouseEmployees(cb){
    async.parallel([
        function(callback){
            warehouseEmployeeCreate('S','Sandra', 'Anderson', 'sandra.anderson@gmail.com,', 'skiwtysfy');
        },
        function(callback){
            warehouseEmployeeCreate('T','Thomas', 'Hudson', 'thomas.hudson@gmail.com,', 'sfbksufhsjd');
        },
        function(callback){
            warehouseEmployeeCreate('V','Victoria', 'Deadman', 'victoria.deadman@gmail.com,', 'uthkwbfbj');
        },
        function(callback){
            warehouseEmployeeCreate('A','Sandra', 'Anderson', 'sandra.anderson@gmail.com,', 'skiwtysfy');
        },
        function(callback){
            warehouseEmployeeCreate('U','Ugo', 'Chiwak', 'ugo.chiwak@gmail.com,', 'iyrecjkkbvqe');
        },
        function(callback){
            warehouseEmployeeCreate('F','Florence', 'whitehead', 'florence.whitehead@gmail.com,', 'gibjvasdfdd');
        }
    ], cb); // optional callback
}


// Run all functions simultaneously e.g createProducts, createUsers etc
async.parallel ([
    createProducts,
    createCustomers,
    createWarehouseEmployees
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
