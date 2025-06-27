import {  useState } from 'react';
import '../App.css'
import {Link} from 'react-router-dom'
import {Toaster,toast} from 'react-hot-toast'
import { Introanimation } from '../components/Chatanimation';
import {io} from 'socket.io-client'
import BASE_URL from '../config';
import connectSocket from '../connectsocket';


export default function LoginPage({setauthUser,authUser,setsocket,socket,onlineUsers,setonlineUsers,setisloggingin,isLogginigin}){
    const [formData,setformData] = useState({email:'',password:''})
    
    
    
    
    
 
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setisloggingin(true)
            const response = await fetch(`${BASE_URL}/user/login`,{method:'POST',credentials:'include',headers:{'Content-type':'application/json'},body:JSON.stringify(formData)})
            const result = await response.json()
            if(result.success===false){
                toast.error(result.message,{duration:4000})
            }
            else{
                toast.success(result.message,{duration:5000})
                setTimeout(() => {
                    setauthUser(result.userData)
                    connectSocket(result.userData._id,setsocket, socket, setonlineUsers)
                }, 2000);
            }
        } 
        catch (error) {
            console.log(error)

        }
        finally{
            setisloggingin(false)
        }
    }
    return(
        <div className='loginPage'>

         <Toaster position="top-center"reverseOrder={false}/>

        <div className='loginBox'>
        <form className="formBox" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='inputBox'>
            <label>Email : <input id='i1' type="email"placeholder={''} onChange={(e)=>{setformData({...formData,email:e.target.value})}}/></label>
            <label>Password : <input id='i2' type="password" onChange={(e)=>{setformData({...formData,password:e.target.value})}}/></label>
            </div>
            <button id='b1' type='submit' disabled={isLogginigin}>Login</button>
            <p className="downlink1">New user? click to <Link to="/signup" className="link">Signup</Link></p>
        </form>
        </div>    
        <div className='pictureBox'>
            <div className='design'>
         <Introanimation/>
         </div>
        </div>
        </div>
    );
}
