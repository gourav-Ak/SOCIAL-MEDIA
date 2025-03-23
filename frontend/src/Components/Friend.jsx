import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {  UserPlus } from 'lucide-react';
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Contextapi } from './Contextapi';
import Login from './Login'
import { useParams } from 'react-router-dom';
import FriendHomeLeft from './FriendHomeLeft';



const Friend = () => {
    let {id}=useParams()
  let {logins,setLogins}=useContext(Contextapi)
  let [friend,setFriend]=useState([])
  

  let [user,setUser]=useState([])
  let [frienddata,setFriendData]=useState([])
  let [post,setPost]=useState([])
  let [comment,setComment]=useState([])
  let [commentinput,setCommentInput]=useState(false)
  let [getcomments,setGetComments]=useState([])
  

  

  useEffect(()=>{
    axios.get(`http://localhost:3000/web/api/getuserfriend/${id}`).then(({data})=>{setFriend(data.userfriend)})
  },[])

  

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
    axios.get(`http://localhost:3000/web/api/postbyid/${id}`).then((r)=>{setPost(r.data.userpost);setFriendData(r.data.usera)})
  },[])

  useEffect(()=>{
    axios.get('http://localhost:3000/web/api/getcomments').then(({data})=>setGetComments(data.comment))
      
  },[])
  
  return (
    <div>
    {logins?<div className='md:flex  gap-[30px] mt-6 w-[96%] m-auto' >
     <div className=''>  <FriendHomeLeft  /></div>
    <div>
    
    <div className='rounded-lg w-[395px] md:w-[550px]  flex flex-col gap-4 '>
      {/* profile`` */}  
        {post.length>0?post.map((e=>{return(<div key={e._id} className=' flex flex-col rounded-xl  gap-4 bg-gray-100  p-6 '>

          <div className='text-sm flex  font-semibold justify-between items-center'>
        <img alt='profile' className='h-[70px] rounded-lg' src={`http://localhost:3000${frienddata.avatar}`}></img>
        <div className='md:mr-30'><p>{frienddata.name}</p>
        <p>{frienddata.email}</p></div>
        <UserPlus onClick={()=>{addfriend(e)}}  className='text-sm hover:cursor-pointer hover:text-red-500' />
      </div>
      <p className='text-sm'>{e.text}</p>
      <div className='flex flex-col gap-2'>
          <img alt='profile' className=' object-cover  w-[500px]' src={`http://localhost:3000/${e.post}`}></img>
       
        <div className='text-md font-semibold'>
          </div><div className='flex  px-6 gap-2 relative'><AiOutlineLike onClick={()=>{addlike(e)}} className={`text-2xl hover:cursor-pointer hover:text-red-400 ${localStorage.getItem('userid')===post.likes?'text-red-500':'text-black'}`} /><p className=''>{e?.likes?.length}</p><LiaCommentSolid onClick={()=>setCommentInput(!commentinput)} className='text-2xl ml-8 hover:cursor-pointer hover:text-red-400' /><p>{getcomments?.length}</p>
          
          {localStorage.getItem('userid')===e.userid._id?<MdOutlineDeleteOutline className='text-2xl ml-35 md:ml-70 hover:cursor-pointer hover:text-red-400' onClick={()=>{del(e)}} />:null}</div>
          <div className={`${commentinput?'inline-block':'hidden'}`}><input onKeyDown={(e)=>addcomment(e)}  value={comment} onChange={(e)=>setComment(e.target.value)} className=' border-b-1 w-[455px]  ml-6 text-sm h-8 outline-none' placeholder='Enter Comment...'></input><div className='flex flex-col mt-1'>{getcomments.map((e)=>{return(<div key={e._id} className='text-sm ml-6 flex flex-col '><p className='border-b-1 py-1 w-[455px]'>{e.comment}</p></div>)})}</div></div></div></div>)})):<div className='bg-gray-100 mt-3 md:mt-0 text-center p-6 font-semibold rounded-lg'>No Post Yet</div>}
          
       </div>
    </div>
  
    {/* right div */}
    <div className='hidden md:inline-block'>
    <div className='w-[350px] h-[310px] flex flex-col justify-between rounded-xl bg-gray-100 p-5'>
    <div className='text-sm flex justify-between'>  <p className='font-semibold'>Sponsered</p><p>Create Add</p></div>
    <img  className='rounded-xl ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaiKsxicAPvGJl4qkuJ5GdOt2N1Ydg60eq1A&s' alt=''></img>
    <div className='text-sm flex justify-between'> <p>Cosemetica</p><p>Cosmeticaproducts.com</p></div>
    <p className='text-sm '>Cosemtetic Products for you healthy skin. Visit our website for more details.</p>
    </div>
    {/* right bottom */}
    <div className=' bg-gray-100 p-5 w-[350px] mt-6 flex flex-col justify-between rounded-xl'><p className='text-sm font-semibold'>Friends List</p><div className='text-sm  flex flex-col gap-4 mt-2'>
      <hr></hr>
     {friend.map((e)=>{return(<div key={e._id} className='flex gap-4 items-center  font-semibold'><img alt='img' className='h-12 rounded-lg w-12 object-cover' src={`http://localhost:3000${e.avatar}`}></img>
     <div className='w-50'><p>{e.name}</p>
     <p>{e.email}</p>
     </div></div>)})}
    </div></div></div></div>:<Login />}
    </div>
  )
}

export default Friend
