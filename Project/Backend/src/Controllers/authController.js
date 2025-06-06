import expess from 'express';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import {generateToken} from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async(req,res)=>{
    try{
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({message: "Password length must be atleast 6"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User with same email already exists"});
        }

        const hashedpassword = await bcryptjs.hash(password,10);
        const newUser =new User({
            email,
            password : hashedpassword,
            fullName
        })

        if(newUser){
            //generate jwt token
            generateToken(newUser._id,res); //sending res so it can add jwt in cookie
            await newUser.save();

            return res.status(200).json({newUser ,message: "User creation success!"});
        }
        else{
            return res.status(400).json({message: "Invalid User data"});
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const login = async(req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({message: "Password length must be atleast 6"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isCorrect = await bcryptjs.compare(password,user.password);

        if(isCorrect){
            //generate jwt token
            generateToken(user._id,res); //sending res so it can add jwt in cookie
            return res.status(200).json({
                _id: user._id ,
                fullName: user.fullName,
                email :  user.email,
                profilePic :  user.profilePic,
            }); 
        }
        else{
            return res.status(400).json({message: "Wrong email or password"});
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const logout = async(req,res)=>{
    //just clear cookies
    try{
        res.cookie("jwt","",{maxAge:0}) 
        return res.status(200).json({message: "Logged out successfully"});
    }
    catch(err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const checkAuth = (req,res)=>{
    try{
        return res.status(200).json(req.user);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}