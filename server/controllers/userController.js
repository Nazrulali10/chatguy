const bcrypt = require('bcryptjs')
const User = require('../models/usermodel')
const generateToken = require('../lib/token')
const cloudinary = require('../lib/cloudinary')

const checkAuth = async(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(400).json({message:"error in ca"})
        
    }

}

const signup = async(req,res)=>{
    try {
        const {fullname,email,password} = req.body
        const check = await User.findOne({email})
        if(check){
            res.status(401).json({success:false,message:"user already exists"})
        }
        else{
            const salt = await bcrypt.genSalt(10)
            const hashedpassword = await bcrypt.hash(password,salt)
            const newUser = new User({fullname,email,password:hashedpassword})
            if(newUser){
                await newUser.save()
                generateToken(newUser._id,res)
                
                return res.status(201).json({userData:{_id:newUser._id,fullname:newUser.fullname,email:newUser.email,profilepic:newUser.profilepic},success:true,message:"user created successfully"})}}
    } 
    catch (error) {
        console.log(`error in signup controller ${error}`)
        res.status(401).json({success:false})
    }
    
}

const login = async(req,res)=>{
try {
   const {email,password} = req.body 
   const user = await User.findOne({email})
   if(!user){
    res.status(401).json({success:false,message:"user doesn't exists"})
   }
   else{
    const check = await bcrypt.compare(password,user.password)
    if(!check){
        res.status(401).json({success:false,message:"password doesn't match"})
    }
    else{
        generateToken(user._id,res)
        res.status(201).json({success:true,message:"Logged in successfully",userData:{_id:user._id,fullname:user.fullname,email:user.email,profilepic:user.profilepic}})
    }
}
} 
catch (error) {
    console.log(`error in login controller ${error}`)
        res.status(401).json({success:false})
}
}

const logout = async(req,res)=>{
    try {
        res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
        res.status(201).json({message:"logged out successfully"})
    } catch (error) {
        res.status(401).json({message:"couldn't log out"})
        console.log(error)
    }

}
const updateprofile = async(req,res)=>{
    try {
        const {profilepic} = req.body
        const userid = req.user._id
        if(!profilepic) return res.status(401).json({message:"picture required"})
        const uploadresponse = await cloudinary.uploader.upload(profilepic)
        const updateuser = await User.findByIdAndUpdate(userid,{profilepic:uploadresponse.secure_url},{new:true})
        res.status(200).json(updateuser)
    }
     catch (error) {
        res.status(400).json({message:"error in profilecontroller"})
        console.log("error in p controller"+error)
    }

}
module.exports = {checkAuth,signup,login,logout,updateprofile}