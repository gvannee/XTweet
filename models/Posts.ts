import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
    desc: {
        type: String
    },

    img: {
        type: String,
    },

    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
        
    },

    createdAt: {
        type: Date,
    }

})

const Post = mongoose.model('Post',PostSchema);
export default Post;