const Post = require('../models/Posts/Post');
const Category = require('../models/Category.model');
const Comment = require('../models/Commet.model');
const { isEmpty } = require('../config/customFunctions');

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

        // checkout input file
        let filename = '';
        if(!isEmpty(req.files)) {
            let file  = req.files.uploadedFiles;
            filename = file.name;
            // dir of uploads
            let uploadDir = './public/uploads/';

            // move to directory
            file.mv(uploadDir+filename, (err) => {
                if (err) {
                    throw err;
                }
            });
        }

        const newPost =  new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            allowComments: commentsAllOwed,
            category: req.body.category,
            file: `/uploads/${filename}`
        });

        try {
            if(newPost) {
                await newPost.save().then(post => {
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
        const post = await Post.findById(req.params.id);
        try {
            if(!post) {
                res.redirect('/admin/posts');
                req.flash('success-message', `This Post Has Delete!`);
            } else if(post && post != {}) {
                const cats = await Category.find(post.category.title);
                if(cats) {
                    res.render('admin/posts/edit', { post, cats });
                    req.flash('success-message', `Update ${post.title} has successfully!`);
                }                
            }
        } catch(e) {
            req.flash('error-message', `Error ${post.title} has Not Update!`);
            throw e;
        }
    },
    editPostSubmit: async (req, res) => {   
            // observe errors prox
        var commentsAllOwed = req.body.allowComments ? true: false; 
        const { title, status, description, category } = req.body;
        await Post.findByIdAndUpdate(req.params.id, {title, status, description, category, commentsAllOwed});
        req.flash('success-message', `Update with ${title} has successfully!`);
        res.redirect('/admin/posts');
    },
    deletePosts: async (err, req, res) => {
        const postDelete = await Post.findByIdAndDelete(req.params.id);
        if(postDelete) {
            req.flash('success-message', `The Post ${postDelete.title} delete`);
            res.redirect('/admin/posts');
        }
        req.flash('error-message', `The Post ${postDelete.title} Not delete`);
        res.json({
            message: 'Error',
            err: err
        });
        
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
        
    },
    editCategoryGet: async (req, res) => {
        const allCategory = await Category.find();
        const uniqueCategory = await Category.findById(req.params.id);
        res.render('admin/category/edit', { allCategory, uniqueCategory });
    },
    editCategoryPost: async (req, res) => {
        const title = req.body.name;
        if(title) {
            const newTitle = await Category.findByIdAndUpdate(req.params.id, { title });
            await newTitle.save();
            res.status(200).json({
                url: '/admin/category'
            });
        }
    },
    /** controllers comments admin */
    getComments: async (req, res) => {
        const comments = await Comment.find().populate('user');
        res.render('admin/comments/index', { comments });
    }
}