import {LogOut,UserRound} from 'lucide-react'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
import BASE_URL from '../config'
export default function NavigationBar({setauthUser,setsocket,socket,setisLoggingOut,isLoggingOut}){
    const handleLogout = async()=>{
        try {
            setisLoggingOut(true)
            const response =await fetch(`${BASE_URL}/user/logout`,{method:"POST",credentials:"include",headers:{'Content-type':'application/json'}})
            const result =await response.json()
            console.log(result)
            toast.success(result.message)
            setauthUser(null)
            (socket&&socket.disconnect())
            setsocket(null)

        } catch (error) {
            console.log(error)
            
        }
       finally{
        setisLoggingOut(false)
       }

    }
    return(
        <div className='navigation'>
        <div className='icon'>ChatGuy</div>
        <div className='navend'>
        <Link to={'/profile'}>
        <UserRound size={15} className='profileroute'/>
        </Link>
        <button className='logoutbutton' onClick={handleLogout}><LogOut size={22}/></button>
        </div>
        </div>
    );
}