import mongoose from "mongoose";
import Image from "./imageSchema.js";

const user= mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    images:[Image.schema]
})

const User= mongoose.model('User',user);
export default User