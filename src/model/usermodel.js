import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required :[true , "Please enter the username"],
        unique : true
    },
    email:{
        type : String,
        required : [true,"Please Enter the email"],
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    isVarified : {
        type : Boolean,
        default : false
    },
    isLoggedIn:{
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    forgetPasswordToken : String,
    forgetPasswordTokenExpire : Date,
    verifyToken : String,
    verifyTokenExpire : Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;