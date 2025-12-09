import express from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";  
import { veryifyUser } from "../middlewares/userAuth.js";

const router = express.Router();    
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",veryifyUser, logoutUser);
router.get("/me", veryifyUser, getUserProfile);
router.put("/me/update", veryifyUser, updateUserProfile); 

export default router;