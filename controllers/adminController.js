module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    table: (req, res) => {
        res.render('admin/table');
    }
}