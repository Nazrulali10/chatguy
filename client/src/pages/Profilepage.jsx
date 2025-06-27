import { Camera } from 'lucide-react'
import BASE_URL from '../config';

export default function Profilepage({authUser,setauthUser}){
    const handleImageUpload = (e)=>{

        try {
            const file = e.target.files[0]
        if(!file) return ;
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async()=>{
            const image = reader.result
            const response = await fetch(`${BASE_URL}/user/updateprofile`,{method:'POST',headers:{'Content-type':'application/json'},credentials: "include",body:JSON.stringify({profilepic:image})})
            const result = await response.json()
            setauthUser(result)
        }
        } catch (error) {
            console.log("error in profilepage")
        }
    }
    return(
        <div className="profile">
            <h1>Profile</h1>
            <div className="profilepicbox">
            <img src={authUser.profilepic || '/profile.png'} alt="profile"/>
            <label className="lab" htmlFor='inputload'><Camera/></label>
            <input type="file" onChange={handleImageUpload} id="inputload" className="hidden" accept="image/*"/>
            </div>
            <span>Active</span>
            <div className='profilereadonly'>
             <label>Name:<input type='text' value={authUser.fullname} readOnly/></label>
             <label>Email: <input type='text' value={authUser.email} readOnly/></label>
            </div>
        </div>
    );
}