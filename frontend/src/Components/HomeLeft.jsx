import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { IoLocationOutline } from "react-icons/io5";
import { IoBagRemoveOutline } from "react-icons/io5";
import { FaTwitterSquare } from "react-icons/fa"
import { MdOutlineEdit } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomeLeft = () => {
  let {id}=useParams()
  let [updateprofile,setUpdateProfile]=useState(null)
  let [data, setData] = useState([])
  let [location,setLocation]=useState('')
  let [occupation,setOccupation]=useState('')
  let [friend,setFriend]=useState([])
  
  let ref=useRef(null)
  let profile=(e)=>{
    ref.current.click()
  }
 

  useEffect(()=>{
    axios.get(`http://localhost:3000/web/api/friendlist/${localStorage.getItem('userid')}`).then(({data})=>(setFriend(data.userfriend)))
   },[])
  useEffect(() => {
      axios.get(`http://localhost:3000/web/api/getuser/${localStorage.getItem('userid')}`).then(({ data }) => {setData(data.userdata);localStorage.setItem('useravatar',data.userdata.avatar)})
      
     
  }, [])
  let changeavatar=async()=>{
    if (!updateprofile){
      alert('Please Click on Profile Image First To Select Image')
    }
    let body=localStorage.getItem('useravatar')
    let data= await new FormData();
    data.append('picture',updateprofile)
    await axios.post(`http://localhost:3000/deletefile`,{useravatar:body}).then((r)=>console.log(r))
    await axios.post(`http://localhost:3000/web/api/avatar/${localStorage.getItem('userid')}`,data,{headers:{'Content-Type':'multipart/form-data'}}).then(({data})=>alert(data.msg));
    window.location.reload()  
  }
  let delavatar= async()=>{
    let body=localStorage.getItem('useravatar')
   await axios.post('http://localhost:3000/deletefile',{useravatar:body})
   await axios.post(`http://localhost:3000/web/api/deleteavatar/${localStorage.getItem('userid')}`).then(({data})=>alert(data.msg));
   window.location.reload()
  }
  let updatelocation=async()=>{
   await axios.post('http://localhost:3000/web/api/setlocation',{location:location,id:localStorage.getItem('userid')}).then(({data})=>alert(data.msg));
   window.location.reload()
  }
  let updateoccupation=async()=>{
    await axios.post('http://localhost:3000/web/api/setoccupation', {occupation:occupation,id:localStorage.getItem('userid')}).then(({data})=>alert(data.msg));
   window.location.reload()
  }
  let delfriend=async(e)=>{
    await axios.post('http://localhost:3000/web/api/deltefriend',{userid:localStorage.getItem('userid'),friendid:e._id}).then(({data})=>alert(data.msg));
    window.location.reload()
  }
  
  return (<div className=''>
    <div className=' bg-gray-100 p-5 w-auto rounded-xl h-fit m-auto  '>

      {/* Profile */}
      <div className=' flex justify-between gap-5 '>

        {/* first div */}
        <div className='h-[90px] w-[90px] border-1  rounded-lg   overflow-hidden hover:cursor-pointer ' ><img alt='avatar' className='h-[100px] object-cover' onClick={profile} src={`http://localhost:3000${data.avatar}`}></img><input type='file' className='text-white w-0' ref={ref} onChange={(e)=>{setUpdateProfile(e.target.files[0])}}></input></div>
        {/* top-center */}
        <div className='text-sm  flex flex-col gap-1 w-full '>
          <p>Name: {data.name}</p><p>Gmail: {data.email}</p><p>Friends: {data?.friends?.length}</p>
          
          <div className=''><button className='bg-blue-500 text-white hover:cursor-pointer px-2 rounded-sm  hover:bg-blue-700' onClick={changeavatar}>Change Avatar</button><button className='bg-blue-500 text-white hover:cursor-pointer px-2 rounded-sm sm:ml-4 ml-2  hover:bg-blue-700' onClick={delavatar}>Delete Avatar</button></div></div>
        {/* top-right */}
        
      </div>
      <hr className='bg-black mt-3'></hr>

      {/* second-part */}
      <div  className='mt-3'>
        <div className='flex flex-col gap-1 '><div className='flex gap-2 items-center'><IoLocationOutline className='text-sm' /><p className='text-sm hover:cursor-pointer' >Location: {data.location}</p></div>
        <div className='flex gap-4'><input className='border-1 px-2 h-5 text-sm w-full md:w-[270px] outline-none' type='text' placeholder='Enter Location' onChange={(e)=>{setLocation(e.target.value)}} ></input><button className='text-sm hover:cursor-pointer px-2 bg-blue-500 text-white hover:bg-blue-700' onClick={updatelocation} >Update</button></div></div>
      
        <div className='flex flex-col gap-1 mt-2 '><div className='flex gap-2 items-center'><IoBagRemoveOutline className='text-sm' /><p className='text-sm hover:cursor-pointer' >Occupation: {data.occupation}</p></div>
        <div className='flex gap-4'><input className='border-1 px-2 h-5 text-sm w-full md:w-[270px] outline-none' type='text' placeholder='Enter Location' onChange={(e)=>setOccupation(e.target.value)} ></input><button className='text-sm hover:cursor-pointer px-2 bg-blue-500 text-white hover:bg-blue-700' onClick={updateoccupation} >Update</button></div></div>
        
      </div>
      <hr className='bg-black mt-3'></hr>
      
      <div className='text-sm mt-3'>Profile Viewed: {data.viewedProfile}</div>
      <hr className='bg-black mt-3'></hr>
 
      {/* Social Profile */}
      <div className='mt-3'>
        <p>Social Profile</p>
        <div className='flex  gap-3 justify-between items-center'><FaTwitterSquare className='text-5xl text-blue-500 hover:cursor-pointer hover:text-blue-700' /><div className='sm:mr-40 hover:cursor-pointer hover:text-blue-700 '><p className='text-sm'>Twitter</p><p className='text-sm'>Social Network</p></div><MdOutlineEdit  /></div>
      </div>
      <hr className='bg-black mt-3'></hr>
      <div className='mt-3'>
        <p>Social Profile</p>
        <div className='flex justify-between gap-3 items-center'><FaInstagramSquare className='text-5xl text-orange-500 hover:cursor-pointer hover:text-orange-700' /><div className='sm:mr-40 '><p className='text-sm'>Linkdin</p><p className='text-sm'>Social Network</p></div><MdOutlineEdit   /></div>
      </div>
      </div>

      <div className='xl:hidden'>
      <p className='ml-4 text-sm mt-3 font-semibold '>Friend List</p>

      <div className=' flex flex-col gap-4 p-4 rounded-xl md:mt-3   mt-2 md:w-[400px]'>
        
            {friend.map((e)=>{return(<Link to={`/friend/${e._id}`}><div key={e._id} className='bg-gray-100 py-5 px-5 rounded-lg relative flex gap-2 sm:gap-4 items-center justify-between text-sm  font-semibold'><img alt='img' className='h-12 shrink-0 rounded-lg w-12 object-cover' src={`http://localhost:3000${e.avatar}`}></img>
                 <div className='w-auto absolute ml-15'><p>{e.name}</p>
                 <p>{e.email}</p>
                 </div><MdOutlineDeleteOutline onClick={()=>{delfriend(e)}} className='text-xl  hover:cursor-pointer hover:text-red-400 sm:ml-18 shrink-0'  /></div></Link>)})}</div></div></div>
  )
}

export default HomeLeft
