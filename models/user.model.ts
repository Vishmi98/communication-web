import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        isVerify: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;