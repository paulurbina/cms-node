const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';

    next();
});

router.route('/')
        .get(adminController.index);

// post
router.route('/posts')
        .get(adminController.getPosts)
        .post(adminController.submitPosts);

        router.route('/posts/create')
                .get(adminController.createPosts);

// table users
router.route('/table')
        .get(adminController.table);

module.exports = router;