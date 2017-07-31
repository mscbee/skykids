var expect = require('chai').expect;
var orderDetails = require("../../model/orderDetails");
var order = require('../../model/order');


describe('orderDetails', function() {
    it('should not be an instance of order, should be an instance of orderDetails', function(done) {
        var o = new orderDetails();

         o.validate(function(err) {
         expect(o).to.not.be.an.instanceof(order);
         expect(o).to.be.an.instanceOf(orderDetails);
            done();
        });
    });
});
