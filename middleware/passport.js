
const passport = require('passport');
const User = require('../db/models').User;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, next) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        next(null, false);
      } else {
        return user;
      }
    })
    .then((user) => {
      user.comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) {
            return next(null, false) 
          } else {
            return next(null, user)
          }
        })
      
    })
    .catch((err) => {
      return next(err);
    })
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.TOKEN_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    })
    .catch((err) => {
      done(err);
    })
})

passport.use(jwtLogin);
passport.use(localLogin);
