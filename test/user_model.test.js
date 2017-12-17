const expect = require('chai').expect;
const User = require('../db/models/user');

let user;

describe('User model', function() {
  it('should be valid if email and password are supplied', function(done) {
    user = new User({
      email: 'test@123.com',
      password: '123'
    });
    user.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });
  });

  it('should be invalid if email is not supplied', function(done) {
    user = new User({
      password: '123'
    })
    user.validate(function(err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is not supplied', function(done) {
    user = new User({
      email: 'test@123.com'
    });
    user.validate(function(err) {
      expect(err.errors.password).to.exist;
      done();
    });
  });
});