const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const { mongoUrl, PORT, globalVariables } = require('./config/config');

// configure mongoose to connect db
mongoose.connect(mongoUrl, { useNewUrlParser: true}) 
    .then(db => console.log('>> Connect Database Native'))
    .catch(e => console.log(e));

// start variables
const app = express();

// configure express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')))
app.set('views', path.join(__dirname, './views'));

// configure flash and session
app.use(session({
    secret: '4524AE5B264E28B9A409C98A3B4314A124',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(globalVariables);


// setup view engine to handlebars
app.engine('.hbs', exphbs({ 
    defaultLayout: 'default',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//routes
const defaultRouter = require('./routes/defaultRouter');
const adminRouter = require('./routes/adminRouter');
app.use('/', defaultRouter);
app.use('/admin', adminRouter);

// server listening
app.listen(PORT, () => { 
    console.log('Server on port 3000');
});