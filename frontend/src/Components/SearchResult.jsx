import React, { useContext } from 'react'
import { Contextapi } from './Contextapi'
import {  UserPlus } from 'lucide-react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const SearchResult = () => {
    let navigate=useNavigate()
    let addfriend=async(e)=>{
        await axios.post('http://localhost:3000/web/api/addfriend',{userid:localStorage.getItem('userid'),friendid:e._id}).then(({data})=>alert(data.msg));
        window.location.reload()
      }
    let {searchuser}=useContext(Contextapi)
    console.log(searchuser)
  return (
    <div className='bg-gray-100 p-4 sm:w-[400px] mt-10 m-auto rounded-xl '>

      {searchuser?.length>0?searchuser.map((e)=>{return(<div className='text-sm font-semibold flex gap-6 items-center justify-between'><img alt='profile' src={`http://localhost:3000${e.avatar}`} className='h-20 w-20 object-cover'></img>
      <div className='sm:mr-20'>
      <p>{e.name}</p><p>{e.email}</p><p>Friends: {e?.friends?.length}</p> </div><UserPlus onClick={()=>addfriend(e)} className='text-sm hover:cursor-pointer hover:text-red-500' /></div>)}):<p className='text-center'>No User Found</p>}
    </div>
  )
}

export default SearchResult
