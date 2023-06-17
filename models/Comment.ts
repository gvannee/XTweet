import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },

    sender: {
        type: String,
    },

    desc: {
        type: String,
    }

},
    { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;