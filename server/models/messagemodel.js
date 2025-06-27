const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({senderid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},recieverid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},text:String,image:String,timestamp:{type:Date,default:Date.now}})

module.exports = mongoose.model("Message",messageSchema)