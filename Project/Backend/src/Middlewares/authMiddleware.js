import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

export const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt; //token name = jwt
        
        if(!token){ 
            console.log("JWT_SECRET:", process.env.JWT_SECRET);
            return res.status(500).json({message: "Unauthorized access"});
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);  //if exist then verify with secret
       

        if(!decoded){
             return res.status(500).json({message: "Unauthorized access"});
        }

        const user = await User.findById(decoded.userId).select("-password"); //dont send password
        if(!user){
             return res.status(500).json({message: "User not found"});
        }

        req.user = user; //So we can know the user id while updating
        next();  //middleware must call next function

    }
    catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
}