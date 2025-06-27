import { useState } from "react";
import {Link} from 'react-router-dom'
import {Toaster,toast} from 'react-hot-toast'
import { Introanimation } from "../components/Chatanimation";
import {io} from 'socket.io-client'
import BASE_URL from "../config";



export default function SignupPage({ setauthUser,authUser,setsocket,socket,onlineusers,setonlineUsers,isSigning,setisSigning}){
const [formData,setformData] = useState({fullname:'',email:'',password:''})


const connectSocket = (userid) =>{
    if(userid){
    const newsocket =io(BASE_URL,{query:{userid:userid}})
    newsocket.connect()
    setsocket(newsocket)
    newsocket.on("getonlineusers",(userids)=>{
        setonlineUsers(userids)
    })
}else{
    console.log("error in sockets")
}
}

const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
        setisSigning(true)
        const response = await fetch(`${BASE_URL}/user/signup`,{method:'POST',credentials:"include",headers:{'Content-Type':'application/json'},body:JSON.stringify(formData)})
        const result = await response.json()
           if(result.success){
            setauthUser(result.userData)
            toast.success(result.message)
            connectSocket(result.userData._id)
           }
           else{
            toast.error(result.message)
           } 
    } 
    catch (error) {
        toast.error(error)
    }
    finally{
        setisSigning(false)
    }
    
}
    return(
        <div className="signupPage">

            <Toaster position="top-center"reverseOrder={false}/>

        <div className="signupBox"> 
        <form className="formBox" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className='inputBox'>
        <label>Fullname : <input id="i3" type="text" onChange={(e)=>{setformData({...formData,fullname:e.target.value})}}/></label>
        <label>Email : <input id="i4" type="email" onChange={(e)=>{setformData({...formData,email:e.target.value})}}/></label>
        <label>Password : <input id="i5" type="password" onChange={(e)=>{setformData({...formData,password:e.target.value})}}/></label>
        </div>
        <button id="b" type="submit" disabled={isSigning}>create
        </button>
        <p className="downlink">already a user? click here to <Link to="/" className="link">Login</Link></p>
       </form>
       </div>  
       <div className="pictureBox">
        <div className="design"> 
        <Introanimation/>
        </div>
       </div>
       </div>
       
    );
}