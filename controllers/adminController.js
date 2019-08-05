const Post = require('../models/Posts/Post');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    getPosts: async (req, res) => {
        const posts = await Post.find();
        try {
            if(posts && posts != {}) {
                res.render('admin/posts/index', { posts });
                console.log(posts);
            }
        } catch(e) {
            res.status(404).send('bad request', e);
            throw e;
        }

    },
    //send data of form create blog
    submitPosts: async (req, res) => {
        const newPost =  new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description
        });
        try {
            if(newPost) {
                await newPost.save().then(post => {
                    console.log(post);
                    // send message a client if OK
                    req.flash('success_message', 'Post created successfully!');
                    res.redirect('/admin/posts');
                });    
            } 
                     
        } catch(e) {
            console.log(e);
            req.flash('error_message', 'Error created Post!');
            throw e;
        }
            
    },
    createPosts: (req, res) => {
        res.render('admin/posts/create');
    },
    table: (req, res) => {
        res.render('admin/table/table');
    }
}