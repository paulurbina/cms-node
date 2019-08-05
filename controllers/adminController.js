const Post = require('../models/Posts/Post');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    getPosts: (req, res) => {
        res.render('admin/posts/index');
    },
    //send data of form create blog
    submitPosts: async (req, res) => {
        const newPost =  new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description
        });

            await newPost.save().then(post => {
                console.log(post);
                // send message a client if OK
                req.flash('success-message', 'Post created successfully!');
                res.redirect('/admin/posts');
            });
         
    },
    createPosts: (req, res) => {
        res.render('admin/posts/create');
    },
    table: (req, res) => {
        res.render('admin/table/table');
    }
}