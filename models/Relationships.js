import mongoose, { Schema } from "mongoose";

const RelationshipSchema = new mongoose.Schema(
    {
        followerUserId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        followedUserId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Relationship = mongoose.model('Relationship', RelationshipSchema);
export default Relationship;