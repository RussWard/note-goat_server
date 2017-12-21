
const passport = require('passport');
const User = require('../db/models').User;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, next) => {
  // User.findOne({ email: email }, (err, user) => {
  //   if (err) { return done(err) }
  //   if (!user) { return done(null, false) }
  //   user.comparePassword(password, (err, isMatch) => {
  //     if (err) { return done(err) }
  //     if (!isMatch) { return done(null, false) }
  //     return done(null, user);
  //   });
  // });
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        next(null, false);
      }
      return user;
    })
    .then((user) => {
      
      user.comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) {
            next(null, false);
          }  
          next(null, user);
        })
    })
    .catch((err) => {
      next(err);
    })
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.TOKEN_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // User.findById(payload.sub, (err, user) => {
  //   if (err) { return done(err) }
  //   if (user) {
  //     done(null, user);      
  //   } else {
  //     done(null, false);
  //   }
  // })
  User.findById(payload.sub)
    .then((user) => {
      if (!user) {
        done(null, false);
      }
      done(null, user);
    })
    .catch((err) => {
      done(err);
    })
})

passport.use(jwtLogin);
passport.use(localLogin);
