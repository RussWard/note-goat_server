require('dotenv').config();
const jwt = require('jwt-simple');
const User = require('../db/models').User;


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.TOKEN_SECRET)
};

module.exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

module.exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    const user = new User({
      email: email,
      password: password
    });
    user.save((err) => {
      if (err) { return next(err) }
      res.send({ token: tokenForUser(user) });
    });
  });
};

module.exports.deleteUser = function(req, res) {
  //this is a protected route, therefore we have a verified user on the req
  req.user.remove(function(err) {
    if (err) { 
      res.status(500).send({ error: 'failed to delete account' }) 
    }
    res.send( { message: 'user account removed' })
  }) 
};