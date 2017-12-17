const controllers = require('./controllers');
const middleware = require('./middleware');
const passportService = require('./middleware').passport;
const passport = require('passport');
const router = require('express').Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//protected resource routes
router.get('/api/protected', requireAuth, (req, res) => {
  console.log('USER ========> ', req.user)
  res.send({ message: 'protected shit' });
});
//auth routes
router.post('/api/signin', requireSignin, controllers.auth.signin);
router.post('/api/signup', controllers.auth.signup);
router.post('/api/delete_user', requireAuth, controllers.auth.deleteUser);
//dictionary api routes
router.get('/api/oxford', middleware.oxford);
router.get('/api/webster', middleware.webster);

module.exports = router;