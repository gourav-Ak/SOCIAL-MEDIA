import mongoose from 'mongoose'

let schema= new mongoose.Schema({
    name:{type:String,
        required:true
    },
    email:{type:String,
        required:true
    },
    password:{type:String,
        required:true,
        unique:true
    },
    avatar:{type:String,
        default:''
    },
    friends:[{type:mongoose.Schema.ObjectId,
           ref: 'User',
           
    }],
    posts:[{type:mongoose.Schema.Types.ObjectId,
           ref: 'Posts',
           
    }], 
    
    viewedProfile:{type:String,
        default:''
        
    },
    occupation:{type:String,
        default:''
    },
    location:{type:String,
        default:''
    },
    
},{timestamps:true})

let usermodel= mongoose.model('User',schema)

export default usermodel