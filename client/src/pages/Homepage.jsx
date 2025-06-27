import NavigationBar from "../components/NavigationBar";
import Sidebar from "../components/Sidebar";
import Nochatselected from "../components/Nochatselected";
import Sidebartop from "../components/Sidebartop";
import { useState,useEffect } from "react";
import Chatselected from "../components/chatselected";

export default function HomePage({authUser, setauthUser,socket,setsocket,setonlineUsers,onlineUsers,isLoggingOut,setisLoggingOut}){
const [selectedUser,setselectedUser] = useState(null)
useEffect(()=>{
    if(authUser._id){
        socket.on("getonlineusers",(userids)=>{
            setonlineUsers(userids)
        })
    }
    },[onlineUsers,setonlineUsers,authUser?._id,socket])


    return(<>
    <div className="pagehead">
    <NavigationBar socket={socket} setsocket={setsocket} setauthUser={setauthUser} isLoggingOut={isLoggingOut} setisLoggingOut={setisLoggingOut}/>
    </div>
    <div className="pagebody">
        <div className="homeleft">
            
            <Sidebartop onlineUsers={onlineUsers}/>
            
            <Sidebar onlineUsers={onlineUsers} setselectedUser={setselectedUser}/>
        </div>
        <div className="homeright">
            {selectedUser?<Chatselected socket={socket} onlineUsers={onlineUsers} authUser={authUser} setselectedUser={setselectedUser}selectedUser={selectedUser}/>:<Nochatselected/>}
        </div>
    </div>
    </>
    );
}