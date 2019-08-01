const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    title: {
        type: String, required: true
    }, 
    status: {
        type: String, default: 'public'
    },
    description: {
        type: String, required: true
    },
    creationDate: {
        type: Date, default: Date.now()
    }
});

module.exports = model('Post', PostSchema);