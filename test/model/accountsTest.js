var should = require('chai').should();
var assert = require('chai').assert;
var accounts = require("../../model/accounts");

describe('tests for account model', function() {

  var account;

  beforeEach(function(done) {
        account= new accounts.account();
        done()
      });

  it('account exists', function(done) {
    should.exist(account);
    done();
  });

});
