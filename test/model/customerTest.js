var expect = require('chai').expect;
var customer = require("../../model/customer");


describe('user', function() {
    it('should inherit a property defined in the user class', function(done) {
        var cust = new customer();

        cust.validate(function(err) {
         //Making sure that 'customer' is inheriting properties from 'user'
         expect(cust).to.have.property('firstName');


            done();
        });
    });
});
