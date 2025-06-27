import { io } from 'socket.io-client';

const connectSocket = (userid,setsocket,socket,setonlineUsers,) =>{
        if(userid){
            if (socket) {
                socket.disconnect(); 
            }
        const newsocket =io(process.env.NODE_ENV !=="production"?"http://localhost:5001":"/",{query:{userid:userid,withCredentials:true}})
        newsocket.connect()
        setsocket(newsocket)
        newsocket.on("getonlineusers",(userids)=>{
            setonlineUsers(userids)
        })
    }else{
        console.log("error in sockets")
    }
    }
export default connectSocket