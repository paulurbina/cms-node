const Post = require('../models/Posts/Post');
const Comment = require('../models/Commet.model');
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
    getSinglePost: async (req, res) => {
        const post = await Post.findById(req.params.id);
        
        //verifity post 
        if(!post) {
            res.status(404).json({ message: 'Not found Post'});
        } else {
            res.render('default/singlePost', { post });
        }
    },
    submitComments: async (req, res) => {
        if (req.user) {
            const post = await Post.findById(req.body.id);
            // If and only if
            if(post) {
                // save data in model Comment
                const newComment = await new Comment({
                    user: req.user.id,
                    body: req.body.contentBody
                });
                //all Ok with comment
                if(newComment) {
                    await post.comments.push(newComment);
                    
                    //save all data in model Post
                    const savePost = await post.save();
                    // if all ok!
                    if(savePost) {
                        const saveNewComment = await newComment.save();
                        if (saveNewComment) {
                            req.flash('success_message', 'Your comment was submitted for review.')
                            res.redirect(`/post/${post._id}`);
                        }
                    }
                }

            }
        }

        else {
            req.flash('error-message', 'Login first to comment');
            res.redirect('/login');
        }
    }

}

