const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    body: {
        type: String, required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: Date,
        default: Date.now()
    },
    commentIsAproved: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Comment', CommentSchema);