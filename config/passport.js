const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const User = require('../models/User.model');


//defining local strategy
//login Users
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if(!user) {
        return done(null, false, req.flash('error_message', 'Not user found'));
    } else {
        const match = await user.validPassword(password);
        if(match) {
            return done(null, user);
        } else {
            return done(null, false, req.flash('error_message', 'Incorrect password'));
        }
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
