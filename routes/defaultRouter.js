const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');

router.all('/*', (req, res, next) => {
        req.app.locals.layout = 'default';
    
        next();
});

router.route('/')
        .get(defaultController.index);

// login
router.route('/login')
        .get(defaultController.loginGet)
        .post(passport.authenticate('local', {
                successRedirect: '/admin',
                failureRedirect: '/login',
                failureFlash: false,
                successFlash: false,
                session: true
        }));

//register
router.route('/register')
        .get(defaultController.registerGet)
        .post(defaultController.registerPost);

module.exports = router;