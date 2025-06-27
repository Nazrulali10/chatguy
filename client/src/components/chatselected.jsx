import { useEffect, useState } from "react";
import Chatheader from "./Chatheader";
import Chatinput from "./Chatinput";
import ScrolltoBottom from 'react-scroll-to-bottom'
import BASE_URL from "../config";


export default function Chatselected({selectedUser,setselectedUser,authUser,onlineUsers,socket}){
const [messages,setmessages] = useState([])    

    useEffect(()=>{
    const getmessages = async()=>{
        const response = await fetch(`${BASE_URL}/message/${selectedUser._id}`,{method:"GET",headers:{'Content-type':'application/json'},credentials:"include"})
        const result = await response.json()
        setmessages(result)
    }
    const subscribeToMessages =()=>{
        socket.on("newMessages",(newMessages)=>{
            setmessages((prevMessages) => [...prevMessages, newMessages])
        })}
    getmessages()
    subscribeToMessages()
    return()=>{
        socket.off("newMessages")
    }
  
    },[selectedUser._id,messages,socket])

    return(

    <div className="chatselected">
        <Chatheader onlineUsers={onlineUsers} selectedUser={selectedUser} setselectedUser={setselectedUser}/>
        <div className="chatbody">

            <ScrolltoBottom className="scrollbar">
                {messages.map((message)=>(
                    <div className={message.senderid===authUser._id?"right":"left"} key={message._id}>
                        <div className={message.senderid===authUser._id?"alignright":"alignleft"}>
                        <img className="sideimage" src={message.senderid===authUser._id?authUser.profilepic||'/profile.png':selectedUser.profilepic||'/profile.png'} alt="imm"/>
                        <div className="chatbox">
                            <div className="msgnme"><p>{message.senderid===authUser._id?authUser.fullname:selectedUser.fullname}</p></div>
                        <div className="imgbox">
                           {(message.image)&&<img src={message.image} alt="myu"/>}
                            </div>
                            <div className="formessage">
                           {(message.text)&&<p>{message.text}</p>}
                            </div>
                            <div className="time">
                           <p> {new Date(message.timestamp).getHours()+":"+new Date(message.timestamp).getMinutes()}</p>
                           </div>
                        </div>
                        </div>
                    </div>
                ))}
                
            </ScrolltoBottom>
        
        </div>
        <Chatinput selectedUser={selectedUser}/>
    </div>

    );
}