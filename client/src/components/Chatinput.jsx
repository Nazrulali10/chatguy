import { Image, Send, X } from "lucide-react";
import { useState } from "react";
import BASE_URL from "../config";

export default function Chatinput({selectedUser}){
const [text,settext] = useState("")
const [imagepreview,setimagepreview] = useState(null)
const[messageSending,setmessageSending] = useState(false)
const handleMessageSubmit = async(e)=>{
    e.preventDefault()
    try {
      setmessageSending(true)
      if(!text.trim()&&!imagepreview) return;
    const response = await fetch(`${BASE_URL}/message/send/${selectedUser._id}`,{method:"POST",credentials:"include",headers:{'Content-type':'application/json'},body:JSON.stringify({text:text.trim(),image:imagepreview})})
    settext("")
    setimagepreview(null)
    const result =  await response.json()
    console.log(result)
    } catch (error) {
      console.log(error)
    }
    finally{
      setmessageSending(false)
    }
    
}
const handleImageChange = (e)=>{
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {
      setimagepreview(reader.result);
    };
    reader.readAsDataURL(file);
  };


    return(
      <div className="chatinputcontainer">
      {imagepreview && <div className="imgpreview">
        <img src={imagepreview} alt="preview"/>
        <label htmlFor="xbutton" className="labelbutton"><X /><button id="xbutton" className="hidden" onClick={()=>{setimagepreview(null)}}></button></label>
        </div>}
        <div className="chatinput">
            <form onSubmit={handleMessageSubmit}>
                <input type="text" placeholder="enter a message..." value={text} onChange={(e)=>{settext(e.target.value)}} className="messagetype"/>
              <label htmlFor="inputchat" className="img"><Image size={18}/><input type="file" accept="image/*" id="inputchat" onChange={handleImageChange} className="hidden"/></label>  
              <label htmlFor="messagesend" className="snd"><button type="submit" id="messagesend" disabled={messageSending}><Send size={16}/></button></label>
            </form>
        </div>
        </div>
    );
}