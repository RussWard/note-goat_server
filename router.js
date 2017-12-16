const controllers = require('./controllers');
const passportService = require('./middleware/passport');
const passport = require('passport');
const router = require('express').Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/api/protected', requireAuth, (req, res) => {
  console.log('USER ========> ', req.user)
  res.send({ message: 'protected shit' });
})
router.post('/api/signin', requireSignin, controllers.auth.signin);
router.post('/api/signup', controllers.auth.signup);

module.exports = router;