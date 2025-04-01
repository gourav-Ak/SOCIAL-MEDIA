import { Search, Bell, Mail } from "lucide-react";
import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "./Contextapi";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  let navigate=useNavigate()
  let { logins, setLogins } = useContext(Contextapi);
  let [hamberg,setHamberg]=useState(false)
  let [search,setSearch]=useState('')
  let {searchuser,setSearchUser}=useContext(Contextapi)
  
  console.log(searchuser)
  useEffect(() => {
    let info = localStorage.getItem("userid");
    if (info) setLogins(true);
  }, []);
  const handleSearch = async (e) => {
    if (!e.key || e.key === "Enter")
    {
      e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/web/api/search?query=${encodeURIComponent(search)}`);
      const data = await response.json();
      setSearchUser(data);
      navigate('/search')
    } catch (error) {
      console.error('Search error:', error);
    }
    }};
  return (<div className="shadow-2xl bg-white pb-4 md:p-0  md:w-auto ">
    <nav className="flex  px-[2%]  gap-5 items-center justify-between p-3  ">

      {/* Left Side - Logo */}
      <Link to="/">
        <img
          src="https://1000logos.net/wp-content/uploads/2024/07/Meetup-social-media-Logo.png"
          alt="Logo"
          className="h-12 w-24 hover:brightness-[70%] hover:cursor-pointer"
        />
      </Link>

      {/* Center - Search Bar */}
      <div className="hidden sm:flex items-center bg-gray-800 w:80 px-4 py-2 rounded-full   mt-2 md:mt-0">
        <Search className="w-5 h-5 text-gray-400 mr-2 hover:cursor-pointer" onClick={handleSearch} />
        <input
          type="text"
          onKeyDown={handleSearch}
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-transparent ml-2 outline-none text-white placeholder-gray-400 w-64"
        />
      </div>

      {/* Right Side - Icons and Button */}
      <div className="flex items-center gap-4  ">
        <Mail className="w-5 h-5 cursor-pointer hover:text-gray-400" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-400" />
        {logins ? (
         
          <button onClick={async() => {
            localStorage.clear();
            setLogins(false);
            window.location.reload();

          }} className=" w-9 hover:cursor-pointer h-3 flex items-center bg-gray-200 rounded-lg">
          <div className={`w-5 h-5  rounded-full duration-[0.5s] ${logins?'translate-x-5 bg-blue-600':'translate-x-0 bg-blue-300'}`} ></div>
        </button>
        ) : (
          <Link to="/login ">
            <button  className=" w-9 hover:cursor-pointer h-3 flex items-center bg-gray-200 rounded-lg">
              <div className={`w-5 h-5  rounded-full duration-[0.5s] ${logins?'translate-x-5 bg-blue-600':'translate-x-0 bg-blue-300'}`} ></div>
            </button>
          </Link>
        )}
      </div>

      <GiHamburgerMenu onClick={()=>setHamberg(!hamberg)} className="text-2xl md:mt-1  p-0 m-0 sm:hidden" />

      <div className={` absolute bg-white duration-[1s] z-20 overflow-hidden flex flex-col gap-2 right-0 p-8  top-17 ${hamberg?' w-30':' w-0 px-0'}`}><Link to='/'><p className="">Home</p></Link><Link to={`${logins?'/homeleft':'/login'}`}><p className="mt-5">Profile</p></Link><p onClick={()=>{localStorage.clear();window.location.reload()}} className="mt-5">{logins?'Logout':'Login'}</p></div>
      {/* Mobile Search Bar */}

      
    </nav>
    <div className="flex sm:hidden items-center bg-gray-800 px-4 py-2   rounded-full w-80 m-auto">
        <Search className="w-5 h-5 text-gray-400 mr-2" onClick={handleSearch} />
        <input
          
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none  pb-1 text-white placeholder-gray-400 w-full"
        />
      </div>
    </div>
  );
}
