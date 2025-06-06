import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { ConnectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser'  
import cors from 'cors';


const app = express();
const port =process.env.PORT;

app.use(express.json()); // to use object destructuring from req.body
app.use(cookieParser());  //to access using req.cookies
app.use(cors({origin:'http://localhost:5173', credentials:true}));

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

app.listen(port,()=>{
    console.log("server running on "+ port);
    ConnectDB(); //connecting database
})