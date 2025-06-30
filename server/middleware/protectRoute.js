const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')

const protectRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            res.status(401).json({message:"token not available invalid user"})
        }
        else{
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
            if(!decode){
                res.status(401).json({message:"invalid token invalid user"})
            }
            else{
                const user =await User.findById(decode.userid).select("-password")
                if(!user){
                    res.status(401).json({message:"user not found"})
                }
                else{
                    req.user = user
                    console.log(token)
                    console.log(req.cookies)
                    next()
                }
            }
        }
        
    } catch (error) {
        res.status(401).json({message:"error in protecting route"})
    }
}
module.exports = protectRoute