const express = require('express');
const router = express.Router();
const  defaultController = require('../controllers/defaultController');
const User = require('../models/User.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


router.all('/*', (req, res, next) => {
        req.app.locals.layout = 'default';
    
        next();
});

router.route('/')
        .get(defaultController.index);

//defining local strategy
passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
}, (req, email, password, done) => {
        const user = User.findOne({ email });
        //validation if existing user
        if(!user) {
          return done(null, false, req.flash('error_message', 'User not found with this email'));
        }
        bcrypt.compare(password, user.password, (error, passwordMatched) => {
                if(error) {
                        throw error;
                }
                if (!passwordMatched) {
                        return done(null, false, req.flash('error_message', 'Invalid User or Password'));
                }
                // All correct
                return done(null, user, req.flash('success_message', 'Login Successfully!'));
        });
}));

passport.serializeUser(function(user, done) {
        done(null, user.id);
});
      
passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
                done(err, user);
        });
});

// end defining local strategy


// login
router.route('/login')
        .get(defaultController.loginGet)
        .post(passport.authenticate('local', { // verification
                successRedirect: '/admin',
                failureRedirect: '/login',
                failureFlash: true,
                successFlash: true,
                session: true
        }) , defaultController.loginPost);

//register
router.route('/register')
        .get(defaultController.registerGet)
        .post(defaultController.registerPost);

module.exports = router;