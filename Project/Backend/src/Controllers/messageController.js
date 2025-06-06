import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar =async(req,res)=>{
    try{
        const loggedInUser  = req.user._id; //to not display self
        const filteredUsers = await User.find({_id: {$ne:loggedInUser}}).select("-password"); //ne - not equal, -password to not fetch password

        res.status(200).json(filteredUsers);
    }
    catch(err){
        res.status(500).json("Internal Server Error");
    }
}

export const getMessages =async(req,res)=>{
    try{
        const {id:userToChatId} =  req.params;
        const myId = req.user._id; //self id
        
        const messages = await Message.find(
        {
            $or:[
                {senderId:myId ,receiverId:userToChatId},
                {senderId:userToChatId ,receiverId:myId}
            ],
        })

        res.status(200).json(messages);
    }
    catch(err){
        res.status(500).json("Internal Server Error");
    }
}

export const sendMessage =async(req,res)=>{
    try{
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const myId = req.user._id;

        let imageUrl; 
        //if image upload to cloud
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId : myId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save();

        //real time functionality - using socket i/o
        res.status(200).json(newMessage);
    }
    catch(err){
        res.status(500).json("Internal Server Error");
    }
}

