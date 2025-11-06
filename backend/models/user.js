import mongoose from "mongoose";
import { Schema } from "mongoose";


const user = new Schema({
  username : String,
  email : String,
  password : String,
})

export const UserModel = mongoose.model("user", user);