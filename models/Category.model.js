const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    title: {
        type: String,
        require: true
    }
});

module.exports = model('Category', CategorySchema);