import { ChevronLeft } from "lucide-react";

export default function Chatheader({selectedUser,setselectedUser,onlineUsers}){
    return(
        <div className="chatheader">
            <button onClick={()=>{setselectedUser(null)}}><ChevronLeft/></button>
            <img src={selectedUser.profilepic || "/profile.png"} alt={selectedUser.fullname}/>
            <div className="headername">
            <p className="nme">{selectedUser.fullname}</p>
            <p id="onlineindicator" className={onlineUsers?.includes(selectedUser._id)?"onlinecolor":"offlinecolor"}>{onlineUsers?.includes(selectedUser._id)?"online":"offline"}</p>
            </div>
        </div>
    );
}