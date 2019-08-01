module.exports = {
    index :  (req, res) => {
        res.render('default/index');
    },
    loginGet: (req, res) => {
        res.render('default/login')
    },
    loginPost: (req, res) => {
        res.send('login post')
    },
    registerGet: (req, res) => {
        res.send('regiter get');
    },
    registerPost: (req, res) => {
        res.send('register post');
    }
}