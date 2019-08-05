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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    allowComments: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Post', PostSchema);