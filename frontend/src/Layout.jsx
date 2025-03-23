import React from 'react'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
    <Navbar />
    <Outlet />
    </div>
  )
}

export default Layout
