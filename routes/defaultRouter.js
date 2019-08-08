const express = require('express');
const router = express.Router();
const  defaultController = require('../controllers/defaultController');
const User = require('../models/User.model');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


router.all('/*', (req, res, next) => {
        req.app.locals.layout = 'default';
    
        next();
});

router.route('/')
        .get(defaultController.index);

router.route('/login')
        .get(defaultController.loginGet)
        .post(defaultController.loginPost);

router.route('/register')
        .get(defaultController.registerGet)
        .post(defaultController.registerPost);

module.exports = router;