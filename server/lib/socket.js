const express = require('express')
const App = express()
const http = require('http')
const server = http.createServer(App)
const {Server} = require('socket.io')
const io = new Server(server,{
    cors:{origin:["http://localhost:5001"]}
})

const socketidmaps={}

const getRecieverSocketId =(userid)=> {
    return socketidmaps[userid]
}

io.on("connection",(socket)=>{
    console.log(`user ${socket.id} is connected`)
    const userid = socket.handshake.query.userid
    if(userid) socketidmaps[userid]=socket.id
    
    io.emit("getonlineusers",Object.keys(socketidmaps))
    socket.on("disconnect",()=>{
        console.log(`user ${socket.id} is disconnected`)
        delete socketidmaps[userid]
        io.emit("getonlineusers",Object.keys(socketidmaps))
    })
})

module.exports = {App,server,io,getRecieverSocketId}