module.exports = {
    mongoUrlNative: 'mongodb://localhost:27017/cms-node',
    mongoServiceMlab: 'mongodb://datacms:datacsm2019@ds347367.mlab.com:47367/datacms',
    PORT: process.env.PORT || 3000,
    globalVariables: (err, req, res, next) => {
        res.locals.success_message = req.flash('success_message');
        res.locals.error_message = req.flash('error_message');

        next();
    },
}