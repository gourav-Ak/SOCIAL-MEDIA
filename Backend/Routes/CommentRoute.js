import express from 'express'
import { comment, getcomments } from '../Controllers/CommentController.js'

let commentroute= express.Router()

commentroute.post('/comment',comment)
commentroute.get('/getcomments',getcomments)

export default commentroute