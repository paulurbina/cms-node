const Post = require('../models/Posts/Post');
const Category = require('../models/Category.model');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    getPosts: async (req, res) => {
        const posts = await Post.find().
            populate('category');
        try {
            if(posts) {
                res.render('admin/posts/index', { posts });
            }
        } catch(e) {
            res.status(404).send('bad request', e);
            throw e;
        }

    },
    //send data of form create blog
    submitPosts: async (req, res) => {

        var commentsAllOwed = req.body.allowComments ? true: false; 
        const newPost =  new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            allowComments: commentsAllOwed,
            category: req.body.category
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
    createPosts: async (req, res) => {    
        const category = await Category.find();
        res.render('admin/posts/create', { category });
    },
    editPosts:  async (req, res) => {
        const id = req.params.id;
        // search id
        // const post = await Post.findById(id);
        // select category for id
        // const cats = await Category.find();
        // sending data a template edit
        // res.render('admin/posts/edit', { post, cats });
          Post.findById(id).
            then(post => {
                Category.find().then(cats => {
                    res.render('admin/posts/edit', { post, cats });
                })
            })
    },
    deletePosts: async (req, res) => {
        const postDelete = await Post.findByIdAndDelete(req.params.id);
        if(postDelete) {
            req.flash('success-message', `The Post ${postDelete.title} delete`);
            res.redirect('/admin/posts');
        }
        req.flash('error-message', `The Post ${postDelete.title} Not delete`);
        res.json({
            message: 'Error',
            err: err
        })
        
    },
    table: (req, res) => {
        res.render('admin/table/table');
    },

    // all admin categories routes
    getCategories: async (req, res) => {
        const category = await Category.find();
        res.render('admin/category/index', { category });
    },
    createCategories: async (req, res) => {
        let categoryName = req.body.name;
        if(categoryName) {
            const category = await new Category({
                title: categoryName
            });
            const newCategory = await category.save();
            res.status(200).json(newCategory);
        }
        
    }

}