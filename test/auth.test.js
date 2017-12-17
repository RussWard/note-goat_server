const expect = require('chai').expect
const httpMocks = require('node-mocks-http');
//const passport = require('../middleware/passport');

// describe('authentication', function() {
//   describe('passport local login', function() {
//     it('passes back a valid jwt token if email and password match', function() {
//       let request = httpMocks.createRequest({
//         body: {
//           email: 'test@123.com',
//           password: '123'
//         }
//       });
//       let response = httpMocks.createResponse();
//       passport.authenticate('local', { session: false }, function(err, token) {
//         expect(token).to.be.an('object');
//         done();
//       })(request, response);
//     });
//   });
// });