import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
    firstname:String,
    lastname:String, 
    email:String,
    phone:String,
    company:String,
    jobtitle:String
});

const User = mongoose.model('USER', userInfoSchema);
export default User;