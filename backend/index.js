import app from './app.js';
import dotenv from 'dotenv';
import connectMongoDb from './config/db.js';
dotenv.config({ path: './config/config.env' });
import {v2 as cloudinary} from "cloudinary";
import Razorpay from 'razorpay';
connectMongoDb();

cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.API_KEY,
  api_secret : process.env.API_SECRET
})

app.get("/", (req, res)=>{
  res.status(200).json({
    message : "request coming successfully"
  })
});

process.on("uncaughtException", (err)=>{
  console.error(err);
  console.log("Server is shuting down due to unhandled promise rejection");
  process.exit(1);
})

const PORT = process.env.PORT

export const instance = new Razorpay({
  key_id : process.env.RAZORPAY_API_KEY,
  key_secret : process.env.RAZORPAY_API_SECRET
})

 const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

process.on("unhandledRejection", (err)=>{
  console.error(err);
  console.log("Server is shuting down due to unhandled promise rejection");
  server.close(()=>{
    process.exit(1);
  })
})
