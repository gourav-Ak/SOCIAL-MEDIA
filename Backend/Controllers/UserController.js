import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import usermodel from '../Models/userModel.js'



let register = async (req, res) => {

    try {
        let { name, email, password } = req.body
        let existinguser= await usermodel.findOne({email})
        if (existinguser){return res.status(201).json({status:false, msg:"User Alerady Existed"})}
        let hashpassword = await bcrypt.hash(password, 10)
        let url = `/Files/${req.file.filename}`
        let user = new usermodel({
            name, email, password: hashpassword, viewedProfile: Math.floor(Math.random() * 1000),
            avatar: url
        })
        user.save()



        return res.status(200).json({ status: 'True', msg: "User Registered Successfully" })

    } catch (error) {
        return res.status(500).json({ status: 'False', msg: error.message })
    }
}
let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await usermodel.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: false, msg: "No user found" });
        }

        let check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(400).json({ status: false, msg: "Password Not Matched" });
        }

        let token = jwt.sign({ id: user._id }, '123', { expiresIn: '1d' });
        return res.status(200).json({
            status: true,
            msg: "Login Successful",
            token,
            id: user._id
        });
    } catch (error) {
        return res.status(500).json({ status: false, msg: error.message });
    }
};
let getuser = async (req, res) => {
    try {
        let { id } = req.params
        let user = await usermodel.findById(id).select('-password')
        if (!user) { return res.status(400).json({ status: "False", msg: "No user Found" }) }
        return res.status(200).json({ status: "True", userdata: user })
    } catch (error) {
        return res.status(400).json({ status: "False", msg: error.message })
    }
}
let avatar = async (req, res) => {
    try {
        let { id } = req.params
        let file = `/Files/${req.file.filename}`
        let user = await usermodel.findByIdAndUpdate(id, { avatar: file })
        if (!user) { return res.status(400).json({ status: "False", msg: "No user Found" }) }
        return res.status(200).json({ status: "True", msg: 'User Avatar Updated Successfully' })
    } catch (error) {
        return res.status(400).json({ status: "False", msg: error.message })
    }
}
let deleteavatar = async (req, res) => {
    try {
        let { id } = req.params
        let user = await usermodel.findByIdAndUpdate(id, { avatar: '' })

        if (!user) { return res.status(400).json({ status: "False", msg: "No user found" }) }
        return res.status(200).json({ status: "True", msg: "Avatar Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ status: "False", msg: error.message })
    }
}
let setlocation = async (req, res) => {
    try {
        let { id, location } = req.body
        await usermodel.findByIdAndUpdate(id, { location: location })
        return res.status(200).json({ status: "True", msg: "Location Updated Successfully" })

    } catch (error) {
        return res.status(500).json({ status: "False", msg: error.message })
    }
}
let occupation = async (req, res) => {
    try {
        let { id, occupation } = req.body
        await usermodel.findByIdAndUpdate(id, { occupation: occupation })
        return res.status(200).json({ status: "True", msg: "Occupation Updated Successfully" })

    } catch (error) {
        return res.status(500).json({ status: "False", msg: error.message })
    }
}
let addfriend = async (req, res) => {
    try {
        let { userid, friendid } = req.body
       
        let user = await usermodel.findById(userid)
        const exists = await user.friends.some(id => id.toString() === friendid);
        if (exists){return res.status(200).json({ status: "False", msg: "Friend Already exists" })}
        else{await usermodel.findByIdAndUpdate(userid, { $push: { friends: friendid } })}

        let userb=await usermodel.findById(friendid)
        const existsb = await userb.friends.some(id => id.toString() === userid);
        if (exists){return res.status(200).json({ status: "False", msg: "Friend Already exists" })}
        else{await usermodel.findByIdAndUpdate(friendid, { $push: { friends: userid } })}
        
        
        return res.status(200).json({ status: "True", msg: "Friend Added" })
    } catch (error) {
        return res.status(500).json({ status: "False", msg: error.message })
    }
}
let friendlist=async(req,res)=>{
    try {
        let {id}=req.params
        let user = await usermodel.findById(id).populate('friends')
        if (!user){return res.status(200).json({status:'False', msg:"No user found"})}
        let userfriend= user.friends
        return res.status(200).json({status:'False', userfriend})
    } catch (error) {
        return res.status(500).json({status:'False', msg:error.message})
    }
}
let deltefriend = async (req, res) => {
    try {
        let { userid, friendid } = req.body

        let user = await usermodel.findById(userid)
        const exists = await user.friends.some(id => id.toString() === friendid);
        if (exists){await usermodel.findByIdAndUpdate(userid, { $pull: { friends: friendid } })}

        let userb=await usermodel.findById(friendid)
        const existsb = await userb.friends.some(id => id.toString() === userid);
        if (exists){await usermodel.findByIdAndUpdate(friendid, { $pull: { friends: userid } })}

        
        
        return res.status(200).json({ status: "True", msg: "Friend Removed" })
    } catch (error) {
        return res.status(500).json({ status: "False", msg: error.message })
    }
}
let getuserfriend = async (req, res) => {
    try {
        let { id } = req.params
        let user = await usermodel.findById(id).populate('friends')
        if (!user) { return res.status(400).json({ status: "False", msg: "No user Found" }) }
        let userfriend=user.friends
        return res.status(200).json({ status: "True", userfriend })
    } catch (error) {
        return res.status(400).json({ status: "False", msg: error.message })
    }
}
let searchuser=async(req,res)=>{
    try {
        let {query}=req.query
        if (!query) return res.status(400).json({ message: 'Query is required' });
        let user= await usermodel.find({
             name: { $regex: query, $options: 'i' } 
        })
        res.json(user);
    } catch (error) {
        return res.status(500).json({msg:error.message, status:"False"})
    }
}

export {searchuser, register, login, getuser, avatar, deleteavatar, setlocation, occupation, addfriend, friendlist, deltefriend,getuserfriend }