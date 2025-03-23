import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './Layout'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import HomeLeft from './Components/HomeLeft'
import Friend from './Components/Friend'
import SearchResult from './Components/SearchResult'

function App() {
  

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={<Signup />}/>
      <Route path='homeleft' element={<HomeLeft />}/>
      <Route path='friend/:id' element={<Friend />}/>
      <Route path='search' element={<SearchResult />}/>
      </Route>
      </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
