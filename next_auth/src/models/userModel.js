import mongoose from "mongoose";

const uesrSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required:  [true, "please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Pplease provide a password']
    },
    isVarified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", uesrSchema);
export default User