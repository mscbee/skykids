var expect = require('chai').expect;
var cart = require("../../model/cart");


describe('cart', function() {
    it('should be a number', function(done) {
        var c = new cart();

        c.validate(function(err) {
         //cartId is required for each cart!
         expect(c).to.have.property('cartId');


            done();
        });
    });
});
