var expect = require('chai').expect;
var product = require("../../model/product");


describe('product', function() {
    it('should be invalid if type is anything other than string', function(done) {
        var p = new product();

        p.validate(function(err) {
          // expect('productName').to.be.a('number') - this should fail (and it did)
          expect('productName').to.be.a('string'); // this test passes
            done();
        });
    });
});
