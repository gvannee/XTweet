import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,

        },

        phone: {
            type: String,
            required: true,

        },

        username: {
            type: String,
        },

        gender: {
            type: String,
        },

        dob: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        profileImg: {
            type: String,
            

        },

        coverImg: {
            type: String,
            
        },

    }
)

const User = mongoose.model('User', UserSchema);
export default User;
