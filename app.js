const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const { mongoUrl, PORT } = require('./config/config');

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