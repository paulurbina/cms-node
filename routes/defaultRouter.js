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

//post Single
router.route('/post/:id')
        .get(defaultController.getSinglePost)
        .post(defaultController.submitComments);

//logout
router.get('/logout', (req, res) => {
        try {
                req.logout();
                req.flash('success_message', 'Logout was successfully');
                res.redirect('/');
        } catch(e) {
                throw e;
        }
});

module.exports = router;