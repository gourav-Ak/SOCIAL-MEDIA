import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userrouter from './Routes/userRoute.js';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import postroute from './Routes/PostRoute.js';
import usermodel from './Models/userModel.js';
import commentroute from './Routes/CommentRoute.js';
dotenv.config()
const app = express();




let __filename= fileURLToPath(import.meta.url)
let __dirname= path.dirname(__filename)
app.use(cors())
app.use(express.json())
app.use('/web/api',userrouter)
app.use('/web/api',postroute)
app.use('/web/api',commentroute)
app.use('/Files', express.static(path.join(__dirname, 'Files')));


app.post('/deletefile', async (req, res) => {
  const filePath = path.join(__dirname ,String(req.body.useravatar))
  fs.unlink(filePath, async (err) => {
    if (err) {
      return res.status(200).json({ message: 'Failed to delete file' });
    }
    res.status(200).json({ message: 'File deleted successfully' });
    
  });
  
  

});
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

mongoose.connect(process.env.URL).then(()=>{
    console.log('Database Connectted');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
})


