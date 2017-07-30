var expect = require('chai').expect;
var cart = require("../../model/cart");


describe('cart', function() {
    it('should be a number', function(done) {
        var c = new cart();

        c.validate(function(err) {
         expect('cartId').to.be.a('boolean'); //this should fail as we're expecting a number type
            done();
        });
    });
});
