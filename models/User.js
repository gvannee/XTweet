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
            default: "https://i.pinimg.com/564x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg"

        },

        coverImg: {
            type: String,
            default: "https://i.pinimg.com/564x/6d/88/e4/6d88e42d56a131ce34e701db32e53bb7.jpg"
            
        },
 
    }
) 

const User = mongoose.model('User', UserSchema);
export default User;
