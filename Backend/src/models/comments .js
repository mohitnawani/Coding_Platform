const mongoose = require('mongoose');
const {Schema} = mongoose;


const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    content: {
        type: String,
        required: true
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }

})

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;
