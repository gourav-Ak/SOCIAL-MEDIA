import React, { useContext, useEffect, useRef, useState } from 'react'
import HomeLeft from './HomeLeft'
import axios from 'axios'
import { MdOutlineImage } from "react-icons/md";
import { AiOutlineAudio } from "react-icons/ai";
import { GoPaperclip } from "react-icons/go";
import { MdOutlineAttachment } from "react-icons/md";
import {  UserPlus } from 'lucide-react';
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Contextapi } from './Contextapi';
import Login from './Login'
import { Link } from 'react-router-dom';



const Home = () => {
  let {logins,setLogins}=useContext(Contextapi)
  let [friend,setFriend]=useState([])
 
  let [user,setUser]=useState([])
  let [post,setPost]=useState([])
  let [comment,setComment]=useState([])
  let [commentinput,setCommentInput]=useState(false)
  let [getcomments,setGetComments]=useState([])
  
  let [file,setFile]=useState(null)
  let [text,setText]=useState('')
  
  let files=(e)=>{
   setFile(e.target.files[0])
   console.log(e.target.files[0])
    
  }
  useEffect(()=>{
    axios.get(`http://localhost:3000/web/api/getuser/${localStorage.getItem('userid')}`).then(({data})=>{setUser(data.userdata)})
  },[])
  let ref=useRef(null)
  let click=()=>{
    ref.current.click()
  }
  let userpost=async()=>{
    let data= new FormData();
    data.append('text',text)
    data.append('picture',file)
    await axios.post(`http://localhost:3000/web/api/post/${localStorage.getItem('userid')}`,data,{headers:{'Content-Type':'multipart/form-data'}}).then(({data})=>{alert(data.msg)});
    window.location.reload()
  }
  useEffect(()=>{
    axios.get(`http://localhost:3000/web/api/getposts`).then(({data})=>setPost(data.posts))
  },[])

  let del=async(e)=>{
    let user=localStorage.getItem('userid')
   await axios.post(`http://localhost:3000/web/api/deletepost/${e._id}`,{userid:user}).then(({data})=>alert(data.msg));
   window.location.reload()
  }

  let addfriend=async(e)=>{
    await axios.post('http://localhost:3000/web/api/addfriend',{userid:localStorage.getItem('userid'),friendid:e.userid._id}).then(({data})=>alert(data.msg));
    window.location.reload()
  }
  let delfriend=async(e)=>{
    await axios.post('http://localhost:3000/web/api/deltefriend',{userid:localStorage.getItem('userid'),friendid:e._id}).then(({data})=>alert(data.msg));
    window.location.reload()
  }

  useEffect(()=>{
   axios.get(`http://localhost:3000/web/api/friendlist/${localStorage.getItem('userid')}`).then(({data})=>(setFriend(data.userfriend)))
  },[])
  let addlike=async(e)=>{

    axios.post('http://localhost:3000/web/api/postlike',{userid:localStorage.getItem('userid'),postid:e._id})
    window.location.reload();
  }
  let addcomment=async(e)=>{
    if (e.key==='Enter')
    {
      await axios.post('http://localhost:3000/web/api/comment',{userid:localStorage.getItem('userid'),comment:comment} ).then(({data})=>alert(data.msg))
      window.location.reload()
    } }

  useEffect(()=>{
    axios.get('http://localhost:3000/web/api/getcomments').then(({data})=>setGetComments(data.comment))
      
  },[])
  
  return (
    <div className=''>

    {logins?
    
    // Profile Component
    <div className='flex flex-col md:flex-row justify-center gap-[30px] mt-6 sm:w-[94%] m-auto' >
    <div className='hidden sm:block'>  <HomeLeft  /></div>

    {/* Post Component */}
    <div className='w-full h'>
    <div  className=' p-5 bg-gray-100 rounded-lg  gap-4 flex flex-col justify-between'>
      <div className='flex gap-4' ><div className='h-[80px] rounded-lg w-[70px] md:w-[80px] bg-white overflow-hidden' ><img alt='avatar' className='h-[100px] object-cover' src={`http://localhost:3000${user.avatar}`}></img></div><input type='text' className='border-1 rounded-lg border-gray-440 w-full outline-none mt-3 text-sm h-10 px-3 text-gray-500 bg-white' placeholder='Whats on you mind' value={text} onChange={(e)=>{setText(e.target.value)}} ></input></div>

      {/* Post-bottom */}
      <hr className='w-auto '></hr>
      <div className='text-sm flex justify-between  '>
        <div className='flex gap-3 items-center hover:cursor-pointer relative  '><MdOutlineImage className='text-lg' /><input className='w-10 hover:cursor-pointer text-gray-100' ref={ref} type='file' placeholder='image' onChange={files} ></input><p className='absolute ml-6' onClick={click}>image</p></div>
        <div className='flex gap-3 items-center hover:cursor-pointer relative'><AiOutlineAudio className='text-lg' /><input className='w-10 hover:cursor-pointer text-gray-100' type='file' ref={ref} onChange={files}></input><p className='absolute ml-6' onClick={click}>Audio</p></div>
        <div className='flex gap-3 items-center hover:cursor-pointer relative'><GoPaperclip className='text-lg' /><input className='w-10 hover:cursor-pointer text-gray-100' type='file' ref={ref} onChange={files}></input><p className='absolute ml-7' onClick={click}>File</p></div>
        <div className='flex gap-3 items-center hover:cursor-pointer relative  mr-8  '><MdOutlineAttachment className='text-lg' /><input ref={ref} className='w-10  text-gray-100 hover:cursor-pointer ' type='file' onChange={files}></input><p className='absolute ml-8 ' onClick={click}>Attachment</p></div>
      </div>
      <button  className='bg-blue-600   text-white rounded-lg px-3 py-1 hover:cursor-pointer hover:bg-blue-800' onClick={userpost}>Post</button>
    </div>

    {/* Post bottom */}
    <div className='rounded-lg mt-5 flex flex-col gap-4 w-full'>
  {/* Profile */}  
  {post.map((e) => (
    <div key={e._id} className='flex flex-col rounded-xl gap-4 bg-gray-100 p-6 w-full'>
      <div className='text-sm flex relative font-semibold justify-between items-center w-full'>
        <img alt='profile' className='h-[50px] w-[50px] rounded-lg object-cover' src={`http://localhost:3000${e.userid.avatar}`} />
        <div className='ml-3 flex-1'>
          <p>{e.userid.name}</p>
          <p className='text-gray-600 text-xs'>{e.userid.email}</p>
        </div>
        <UserPlus onClick={() => addfriend(e)} className='text-sm hover:cursor-pointer hover:text-red-500' />
      </div>
      <p className='text-sm'>{e.text}</p>
      <div className='flex flex-col gap-2 w-full'>
        <img alt='post' className='object-cover w-full rounded-lg' src={`http://localhost:3000/${e.post}`} />
        <div className='flex px-6 gap-2 items-center'>
          <AiOutlineLike onClick={() => addlike(e)} className={`text-2xl hover:cursor-pointer hover:text-red-400 ${localStorage.getItem('userid') === post.likes ? 'text-red-500' : 'text-black'}`} />
          <p>{e?.likes?.length}</p>
          <LiaCommentSolid onClick={() => setCommentInput(!commentinput)} className='text-2xl ml-4 hover:cursor-pointer hover:text-red-400' />
          <p>{getcomments?.length}</p>
          {localStorage.getItem('userid') === e.userid._id && (
            <MdOutlineDeleteOutline className='text-2xl ml-auto hover:cursor-pointer hover:text-red-400' onClick={() => del(e)} />
          )}
        </div>
        {commentinput && (
          <div className='px-6 w-full'>
            <input 
              onKeyDown={(e) => addcomment(e)} 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              className='border-b w-full text-sm h-8 outline-none' 
              placeholder='Enter Comment...'
            />
            <div className='flex flex-col mt-1'>
              {getcomments.map((comment) => (
                <div className='text-sm flex flex-col' key={comment._id}>
                  <p className='border-b py-1 w-full'>{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ))}
</div>

    </div>
  
    {/* Sponsered Component */}
    <div className='hidden xl:inline-block'>
    <div className='w-[350px] h-[310px] flex flex-col justify-between rounded-xl bg-gray-100 p-5'>
    <div className='text-sm flex justify-between'>  <p className='font-semibold'>Sponsered</p><p>Create Add</p></div>
    <img  className='rounded-xl ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaiKsxicAPvGJl4qkuJ5GdOt2N1Ydg60eq1A&s' alt=''></img>
    <div className='text-sm flex justify-between'> <p>Cosemetica</p><p>Cosmeticaproducts.com</p></div>
    <p className='text-sm '>Cosemtetic Products for you healthy skin. Visit our website for more details.</p>
    </div>

    {/* Friend List */}
    <div className=' bg-gray-100 p-5 w-[350px] mt-6 hidden xl:flex flex-col justify-between rounded-xl'><p className='text-sm font-semibold'>Friends List</p><div className='text-sm  flex flex-col gap-4 mt-2'>
      <hr></hr>
     {friend.map((e)=>{return(<Link to={`/friend/${e._id}`} key={e._id}><div className='flex gap-4 items-center  font-semibold hover:cursor-pointer'><img alt='img' className='h-12 rounded-lg w-12 object-cover' src={`http://localhost:3000${e.avatar}`}></img>
     <div className='w-50'><p>{e.name}</p>
     <p>{e.email}</p>
     </div><MdOutlineDeleteOutline onClick={()=>{delfriend(e)}} className='text-xl  hover:cursor-pointer hover:text-red-400'  /></div></Link>)})}
    </div></div></div></div>:<Login />}
    </div>
  )
}

export default Home
