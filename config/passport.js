const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User.model');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    //defining local strategy

    //Signup
    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) { return done(err); }
                if (user) {
                    return done(null, false, req.flash('error_message', 'the email is already taken'));
                } else {
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) { throw err; }
                        return done(null, newUser);
                    });
                }
            });
        }
    ));

    //login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, req.flash('error_message', 'Not user found'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('error_message', 'Wrong password'));
                }
                req.flash('success_message', 'Welcome!');
                return done(null, user);
            });
        }
    ));


}
