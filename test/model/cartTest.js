var expect = require('chai').expect;
var cart = require("../../model/cart");


describe('cart', function() {
    it('each cart object needs to have a cartId', function(done) {
        var c = new cart();

        c.validate(function(err) {
         //cartId is required for each cart!
         expect(c).to.have.property('cartId');


            done();
        });
    });
});
