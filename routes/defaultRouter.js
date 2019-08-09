const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');
//const bcrypt = require('bcryptjs');


router.all('/*', (req, res, next) => {
        req.app.locals.layout = 'default';
    
        next();
});

router.route('/')
        .get(defaultController.index);

// login
router.route('/login')
        .get(defaultController.loginGet)
        .post(passport.authenticate('local-login', {
                successRedirect: '/admin',
                failureRedirect: '/login',
                failureFlash: true,
                successFlash: true,
                session: true
        }), defaultController.loginPost);

//register
router.route('/register')
        .get(defaultController.registerGet)
        .post(passport.authenticate('local-register', {
                successRedirect: '/login',
                failureRedirect: '/register',
                failureFlash: true,
                successFlash: true
        }), defaultController.registerPost);

module.exports = router;