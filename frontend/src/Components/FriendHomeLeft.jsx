import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { IoLocationOutline } from "react-icons/io5";
import { IoBagRemoveOutline } from "react-icons/io5";
import { FaTwitterSquare } from "react-icons/fa"
import { MdOutlineEdit } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { MdOutlineDeleteOutline } from "react-icons/md";

const FriendHomeLeft = () => {
    let {id}=useParams()
  let [updateprofile,setUpdateProfile]=useState(null)
   let [friend,setFriend]=useState([])
  let [data, setData] = useState([])
  let [location,setLocation]=useState('')
  let [occupation,setOccupation]=useState('')
  
  let ref=useRef(null)
  let profile=(e)=>{
    ref.current.click()
  }

  let delfriend=async(e)=>{
    await axios.post('http://localhost:3000/web/api/deltefriend',{userid:localStorage.getItem('userid'),friendid:e._id}).then(({data})=>alert(data.msg));
    window.location.reload()
  }

  useEffect(()=>{
    axios.get(`http://localhost:3000/web/api/getuserfriend/${id}`).then(({data})=>{setFriend(data.userfriend)})
  },[])

  useEffect(() => {
      axios.get(`http://localhost:3000/web/api/getuser/${id}`).then(({ data }) => {setData(data.userdata);localStorage.setItem('useravatar',data.userdata.avatar)})
  }, [])


  
  return (<>
    <div className=' bg-gray-100 p-5 w-[400px] rounded-xl h-fit justify-between '>
      {/* top */}
      <div className=' flex justify-between items-center'>
        {/* top-left */}
        <div className='h-[90px] w-[70px] rounded-lg   bg-white overflow-hidden hover:cursor-pointer ' ><img alt='avatar' className='h-[100px] object-cover' onClick={profile} src={`http://localhost:3000${data.avatar}`}></img><input type='file' className='text-white w-0' ></input></div>
        
        <div className='text-sm  flex flex-col h-[90px] gap-1 font-semibold '>
          <p className='mt-3'>Name: {data.name}</p><p>Gmail: {data.email}</p><p>Friends: {data?.friends?.length}</p></div>
        
        <MdOutlineEdit className="w-5 h-5 mt-2 text-gray-600 hover:text-blue-500 cursor-pointer" />
      </div>
      <hr className='bg-black mt-3'></hr>

      {/* second-part */}
      <div  className='mt-3'>
        <div className='flex flex-col gap-1 '><div className='flex gap-2 items-center'><IoLocationOutline className='text-sm' /><p className='text-sm hover:cursor-pointer' >Location: {data.location}</p></div>
       </div>
      
        <div className='flex flex-col gap-1 mt-2 '><div className='flex gap-2 items-center'><IoBagRemoveOutline className='text-sm' /><p className='text-sm hover:cursor-pointer' >Occupation: {data.occupation}</p></div>
        </div>
        
      </div>
      <hr className='bg-black mt-3'></hr>
      <div className='text-sm mt-3'>Profile Viewed: {data.viewedProfile}</div>
      <hr className='bg-black mt-3'></hr>
 
      {/* Social Profile */}
      <div className='mt-3'>
        <p>Social Profile</p>
        <div className='flex justify-between items-center'><FaTwitterSquare className='text-5xl text-blue-500 hover:cursor-pointer hover:text-blue-700' /><div className='mr-45 hover:cursor-pointer hover:text-blue-700'><p className='text-sm'>Twitter</p><p className='text-sm'>Social Network</p></div><MdOutlineEdit  /></div>
      </div>
      <hr className='bg-black mt-3'></hr>
      <div className='mt-3'>
        <p>Social Profile</p>
        <div className='flex justify-between items-center'><FaInstagramSquare className='text-5xl text-orange-500 hover:cursor-pointer hover:text-orange-700' /><div className='mr-45'><p className='text-sm'>Linkdin</p><p className='text-sm'>Social Network</p></div><MdOutlineEdit   /></div>
      </div>
      
      </div>
      <div className='bg-gray-100 p-3 rounded-xl mt-3 md:hidden'>
      {friend.map((e)=>{return(<div key={e._id} className='flex gap-4 items-center  font-semibold'><img alt='img' className='h-12 rounded-lg w-12 object-cover' src={`http://localhost:3000${e.avatar}`}></img>
           <div className='w-50'><p>{e.name}</p>
           <p>{e.email}</p>
           </div><MdOutlineDeleteOutline onClick={()=>{delfriend(e)}} className='text-xl ml-18  hover:cursor-pointer hover:text-red-400'  /></div>)})}</div></>
  )
}

export default FriendHomeLeft
