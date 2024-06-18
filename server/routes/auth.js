const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const mainController = require('../controllers/mainControllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/loginSchema');
const {
  checkNotAuthenticated,
} = require('../middleware/checkNotAuthenticated');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect Email' });
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect Password' });
      } catch (error) {
        return done(e);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

router.get('/login', checkNotAuthenticated, mainController.login);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/my',
    failureRedirect: '/login',
    failureFlash: true,
  }),
);

router.get('/signup', checkNotAuthenticated, mainController.signup);

router.post('/signup', checkNotAuthenticated, mainController.signupPost);

router.delete('/logout', mainController.logout);

module.exports = router;
