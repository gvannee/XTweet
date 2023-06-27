import mongoose, { Schema } from "mongoose";

const LikeSchema = new mongoose.Schema({
    likeUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    likePostId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    }
})

const Likes = mongoose.model('Likes', LikeSchema);
export default Likes;