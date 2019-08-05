module.exports = {
    mongoUrl: 'mongodb://localhost:27017/cms-node',
    PORT: process.env.PORT || 3000,
    globalVariables: (err, req, res, next) => {
        res.locals.success_message = req.flash('success_message');
        res.locals.error_message = req.flash('error_message');

        next();
    },
}