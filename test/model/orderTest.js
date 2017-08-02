var expect = require('chai').expect;
var order = require("../../model/order");


describe('order', function() {
    it('new objects are instances of the class', function(done) {
        var o = new order();

         o.validate(function(err) {
         expect(o).to.be.instanceOf(order);


            done();
        });
    });
});
