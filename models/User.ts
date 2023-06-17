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
            required: true,
        },

        gender: {
            type: String,
            required: true,
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
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthxombang.edu.vn%2Favatar-mac-dinh-facebook%2F&psig=AOvVaw0KdXBlIdGlNw7atk3Bmdlu&ust=1686735961468000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOirvaD7v_8CFQAAAAAdAAAAABAE",

        },

        coverImg: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthxombang.edu.vn%2Favatar-mac-dinh-facebook%2F&psig=AOvVaw0KdXBlIdGlNw7atk3Bmdlu&ust=1686735961468000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOirvaD7v_8CFQAAAAAdAAAAABAE",
        },

    }
)

const User = mongoose.model('User', UserSchema);
export default User;
