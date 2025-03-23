import mongoose from "mongoose";

let postSchema= new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    comments:{type:Array,
        default:[]
    },
    likes:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    
    post:{
        type:String,
        required:true
    },
    text:{type:String,
        
    },
    totalLikes:{type:String}
},{timestamps:true})

let postmodel= mongoose.model('Posts', postSchema)

export default postmodel