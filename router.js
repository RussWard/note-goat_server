const controllers = require('./controllers');
const middleware = require('./middleware');
const passportService = require('./middleware').passport;
const passport = require('passport');
const router = require('express').Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//protected resource routes
router.get('/api/protected', requireAuth, (req, res) => {
  res.send({ message: 'protected shit' });
});
router.post('/api/insert_flashcard', requireAuth, controllers.flashcard.insert);
router.post('/api/delete_one', requireAuth, controllers.flashcard.deleteOne);
router.get('/api/get_all', requireAuth, controllers.flashcard.getAll);

//auth routes
router.post('/api/signin', requireSignin, controllers.auth.signin);
router.post('/api/signup', controllers.auth.signup);
router.post('/api/delete_user', requireAuth, controllers.auth.deleteUser);
//dictionary api routes
router.get('/api/oxford', middleware.oxford);
router.get('/api/webster', middleware.webster);

module.exports = router;