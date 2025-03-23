import express from 'express'
import { deletepost, getposts, post, postbyid, postlike } from '../Controllers/PostController.js'
import multer from 'multer'


let postroute= express.Router()
let storage= multer.diskStorage({
    destination: (req,file,cb)=>{
    cb(null, 'Files')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
})

let upload= multer({storage})



postroute.post('/post/:id',upload.single('picture'),post)
postroute.get('/getposts',getposts)
postroute.post('/deletepost/:id',deletepost)
postroute.post('/postlike',postlike)
postroute.get('/postbyid/:id',postbyid)


export default postroute