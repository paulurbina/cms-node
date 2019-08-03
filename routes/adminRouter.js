const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';

    next();
});

router.route('/')
        .get(adminController.index);

router.route('/table')
        .get(adminController.table);

module.exports = router;