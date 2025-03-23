import { createContext, useState, useEffect } from "react";

export const Contextapi= createContext();

let ContextProvider=({children})=>{
    let [logins,setLogins]=useState(false)
    let [searchuser,setSearchUser]=useState([])
    useEffect(()=>{
        let info=localStorage.getItem('userid')
        if (info){setLogins(true)}
      
      },[])
    return(
    <Contextapi.Provider value={{logins,setLogins,searchuser,setSearchUser}}>
        {children}
    </Contextapi.Provider>
    )
}

export default ContextProvider