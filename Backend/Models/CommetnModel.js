import mongoose from "mongoose";

let commmentSchema= new mongoose.Schema({
    userId:String,
    userName:String,
    userEmail:String,
    userAvatar:String,
    comment:String
},{timestamps:true})

let commentmodel= mongoose.model('Comment',commmentSchema)

export default commentmodel