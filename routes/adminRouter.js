const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isUserAuthentication } = require('../config/customFunctions');

router.all('/*', isUserAuthentication, (req, res, next) => {
    req.app.locals.layout = 'admin';

    next();
});

router.route('/')
        .get(adminController.index);    

// post
router.route('/posts')
        .get(adminController.getPosts)

router.route('/posts/create')
        .get(adminController.createPosts)
        .post(adminController.submitPosts);

router.route('/posts/edit/:id')
        .get(adminController.editPosts)
        .put(adminController.editPostSubmit);

router.route('/posts/delete/:id')
        .delete(adminController.deletePosts);

// admin categories routes
router.route('/category')
        .get(adminController.getCategories)
        .post(adminController.createCategories);

router.route('/category/edit/:id')
        .get(adminController.editCategoryGet)
        .post(adminController.editCategoryPost);

// table users
router.route('/table')
        .get(adminController.table);

module.exports = router;