const Post = require('../models/Posts/Post');
const Category = require('../models/Category.model');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

module.exports = {
    index :  async (req, res) => {
        
        const posts = await Post.find();
        const categories = await Category.find();

        res.render('default/index', { posts, categories });
    },
    loginGet: (req, res) => {
        res.render('default/login')
    },
    loginPost: (req, res) => {
        res.send('login post')
    },
    registerGet: (req, res) => {
       res.render('default/register')
    },
    registerPost: async (req, res) => {
        // users after express-validation
        let errors = [];

        const { firstName, lastName, email, password, passwordConfirm } = req.body;

        if(!firstName) {
            errors.push({ message: 'First name is required'});
        }
        if(!lastName) {
            errors.push({ message: 'Last name is required'});
        }
        if(!email) {
            errors.push({ message: 'Email name is required'});
        }
        if(!password && password !== passwordConfirm) {
            errors.push({ message: 'Password do not match'});
        }

        // if errors
        if(errors.length > 0) {
            res.render('default/register', { errors, firstName, lastName, email});
        } else {
            const user = await User.findOne({ email });
            
            // if existing user in db
            if(user) {
                req.flash('error-message', 'Email already exists, try to login');
                res.redirect('/login');
            } else {
                // create new user
                const newUser = await new User(req.body);

                // using bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        newUser.password = hash;
                        await newUser.save();
                        // sending message OK!
                        req.flash('success-message', 'You are now Registered!');
                        res.redirect('/login');
                    });
                });
            }
            
        }
    }
}