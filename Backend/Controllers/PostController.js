import postmodel from "../Models/PostModel.js"
import usermodel from "../Models/userModel.js"

let post=async(req,res)=>{
    try {
        let {id}= req.params
        let {text}=req.body
        let posturl= `Files/${req.file.filename}`
        let newpost = await postmodel({
            userid:id, post:posturl, text:text,
        })
        let saved= await newpost.save()
        let user= await usermodel.findByIdAndUpdate(id,{$push:{posts:saved._id}},{ new: true })
        let post = saved.post
        if (!user){return res.status(400).json({status:"False", msg:"No user Found"})}
        return res.status(200).json({status:"True", msg:"Post Uploaded Successfully",post})

    } catch (error) {
        return res.status(500).json({status:"False", msg:error.message})
    }
}
let getposts=async(req,res)=>{
    try {
        let posts= await postmodel.find().populate('userid')
        let user= posts.user
        return res.status(200).json({status:"True", posts,user})
    } catch (error) {
        return res.status(500).json({status:"False", msg : error.message})
    }
}
let deletepost=async(req,res)=>{
    try {
        let {id}=req.params
        let {userid}=req.body
        await usermodel.findByIdAndUpdate(userid,{$pull:{posts:id}})
        await postmodel.findByIdAndDelete(id)
        return res.status(200).json({status:"True", msg:"Post Deleted"})
    } catch (error) {
        return res.status(500).json({status:"False", msg:error.message})
    }
}
let postlike=async(req,res)=>{
    try {
        let {userid,postid}=req.body
        let post= await postmodel.findById(postid)
        if (!post) return res.status(404).json({ message: 'Post not found' })
        let check= post.likes.some(e=>e.toString()===userid)
        if (check){await postmodel.findByIdAndUpdate(postid, {$pull:{likes:userid}})}
        else{await postmodel.findByIdAndUpdate(postid, {$push:{likes:userid}})}
        return res.status(200).json({status:"True"})
    } catch (error) {
        return res.status(500).json({status:"False", msg:error.message})
    }
}
let postbyid=async(req,res)=>{
    try {
        let {id}=req.params
        let usera = await usermodel.findById(id)
        let user= await usermodel.findById(id).populate('posts')
        if (!user) return res.status(404).json({ message: 'No user found' })
        let userpost=user.posts   
        return res.status(200).json({status:"True",userpost,usera})
    } catch (error) {
        return res.status(500).json({status:"False", msg:error.message})
    }
}
export {post,getposts,deletepost,postlike,postbyid}