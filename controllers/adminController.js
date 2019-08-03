module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    getPosts: (req, res) => {
        res.send('all posts');
    },
    submitPosts: (req, res) => {
        res.send('sumit');
    },
    createPosts: (req, res) => {
        res.render('admin/posts/create');
    },
    table: (req, res) => {
        res.render('admin/table/table');
    }
}