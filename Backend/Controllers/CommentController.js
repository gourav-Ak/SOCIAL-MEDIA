import commentmodel from "../Models/CommetnModel.js"
import usermodel from "../Models/userModel.js"

let comment=async(req,res)=>{
    try {
    let {userid,comment}=req.body
    let user= await usermodel.findById(userid)
    let newcomment= await new commentmodel({
    userId:user._id,userName:user.name,userEmail:user.email,userAvatar:user.avatar,comment:comment
    })
    await newcomment.save()
    return res.status(200).json({status:'True', msg:'Comment Added'})
    } catch (error) {
        return res.status(500).json({status:'False', msg:error.message})
    }
}
let getcomments=async(req,res)=>{
    try {
        let comment= await commentmodel.find()
        return res.status(200).json({status:'True', comment})
        } catch (error) {
            return res.status(500).json({status:'False', msg:error.message})
        }
}

export {comment, getcomments}