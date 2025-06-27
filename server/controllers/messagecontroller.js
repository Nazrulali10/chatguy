
const Message = require('../models/messagemodel')
const User = require('../models/usermodel')
const cloudinary = require('../lib/cloudinary')
const {io,getRecieverSocketId} = require('../lib/socket')


const getusers = async(req,res)=>{
try {
    const loggedinuser = req.user._id
    const filteredusers = await User.find({_id:{$ne:loggedinuser}}).select("-password")
    res.status(200).json(filteredusers)
} catch (error) {
    res.status(401).json({message:"error in gu"})
    console.log(error)
}
}
const getmessages = async(req,res) =>{
try {
    const myid = req.user._id
    const recieverid = req.params.id
    const messages = await Message.find({$or:[{senderid:myid,recieverid:recieverid},{senderid:recieverid,recieverid:myid}]})
    res.status(200).json(messages)

} catch (error) {
    res.status(401).json({message:"error in gm"})
    console.log(error)
}
}
const sendmessage = async(req,res)=>{
try {
    const {image,text} = req.body
    const recieverid = req.params.id
    const senderid = req.user._id

    let imageurl
    if(image){
        const uploadresponse =await cloudinary.uploader.upload(image)
        imageurl = uploadresponse.secure_url
    }
    const newMessage =await new Message({senderid,recieverid,text,image:imageurl})
    await newMessage.save()
    const recieversocketid = getRecieverSocketId(recieverid)
    if(recieversocketid){
        io.to(recieversocketid).emit("newMessage",newMessage)
    }
    
    res.status(200).json(newMessage)
} catch (error) {
    res.status(401).json("error in sm")
    console.log(error)
}
}
module.exports = {getusers,getmessages,sendmessage}