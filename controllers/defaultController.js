const Post = require('../models/Posts/Post');
const Category = require('../models/Category.model');

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
    registerPost: (req, res) => {
        res.send('register post');
    }
}