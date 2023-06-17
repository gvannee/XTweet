import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema({
    desc: {
        type: String,
    },

    createAt: {
        type: String,
    },

    comUserId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
