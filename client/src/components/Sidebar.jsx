import { useEffect, useState } from "react"
import ScrolltoBottom from 'react-scroll-to-bottom'
import BASE_URL from "../config"

export default function Sidebar({setselectedUser,onlineUsers}){
const [users,setusers] = useState([])


useEffect(()=>{
    const getusers = async()=>{
        const response = await fetch(`${BASE_URL}/message/getusers`,{method:"GET",headers:{'Content-type':'application/json'},credentials:"include"})
        const result = await response.json()
        console.log(result)
        setusers(result)
        }
        getusers()
},[])

    return(
    <div className="sidebar">
        <ScrolltoBottom>
        <div className="chatbutton">
            {users?.map((user)=>(
                 <button key={user._id} onClick={()=>{setselectedUser(user)}}>
                    <div>
                    <img src={user.profilepic || "/profile.png"} alt={user.fullname}/>
                    {onlineUsers?.includes(user._id)&&<span className="greenround"></span>}
                    </div>
                    <p>{user.fullname}</p>
                    
                 </button>
            ))}
        </div>
        </ScrolltoBottom>
        </div>)
}