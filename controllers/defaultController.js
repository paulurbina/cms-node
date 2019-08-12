const Post = require('../models/Posts/Post');
const Category = require('../models/Category.model');
const User = require('../models/User.model');

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
                req.flash('error_message', 'Email already exists, try to login');
                res.redirect('/register');
            } else {
                const emailUser = await User.findOne({ email });
                if(emailUser) {
                    req.flash('error_message', 'The Email is already in use!');
                    res.redirect('/register');
                }
                const newUser = new User({ firstName, lastName, email, password });
                newUser.password = await newUser.generateHash(password);
                await newUser.save((err) => {
                    if(err) throw err;
                    req.flash('success_messsage', 'You are registered');
                    res.redirect('/login');
                });
                
            }
            
        }
    },
    singlePost: async (req, res) => {
        const post = await Post.findById(req.params.id);
        console.log(post);
        
        //verifity post 
        if(!post) {
            res.status(404).json({ message: 'Not found Post'});
        } else {
            res.render('default/singlePost', { post });
        }
    }

}