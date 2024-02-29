import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    Fname: String,
    Lname: String,
    Email: String,
    Dob:Date,
    phoneNo:Number,
    profession: String,
    CompanyOrInsitiute: String,
    Password: String,
    admin:Number
    });

 export const User = mongoose.model('User', userSchema);