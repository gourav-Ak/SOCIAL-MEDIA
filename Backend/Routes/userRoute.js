import express from 'express'
import multer from 'multer'
import { addfriend, avatar, deleteavatar, deltefriend, friendlist, getuser, getuserfriend, login, occupation, register, searchuser, setlocation, } from '../Controllers/UserController.js';
let userrouter=express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Files/'); // Save files in 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + "-" + file.originalname); // Rename the file
    }
  });
  
  const upload = multer({ storage: storage });
  

userrouter.post('/register',upload.single('picture'),register)
userrouter.post('/avatar/:id',upload.single('picture'),avatar)
userrouter.post('/deleteavatar/:id',deleteavatar)
userrouter.post('/login',login)
userrouter.post('/setlocation',setlocation)
userrouter.post('/setoccupation',occupation)
userrouter.get('/getuser/:id',getuser)
userrouter.get('/getuserfriend/:id',getuserfriend)
userrouter.post('/addfriend',addfriend)
userrouter.post('/deltefriend',deltefriend)
userrouter.get('/friendlist/:id',friendlist)
userrouter.get('/search',searchuser)


export default userrouter