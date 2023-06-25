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
            default: "https://haycafe.vn/wp-content/uploads/2022/02/Hinh-anh-avatar-facebook-doc-nen-ombre.jpg",

        },

        coverImg: {
            type: String,
            default: "https://www.treehugger.com/thmb/CuTzoTtXv9ThPkwdSxHREceRFU8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/scenic-view-of-silhouette-mountains-against-sky-during-sunset-1325186919-166516c836d644dd953f34a3b7fe9c7f.jpg",
        },

    }
)

const User = mongoose.model('User', UserSchema);
export default User;
