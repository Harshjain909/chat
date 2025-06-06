import mongoose from 'mongoose'

export const ConnectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("DATABASE connection");
        })
    }
    catch(err){
        console.log(err);
    }
}