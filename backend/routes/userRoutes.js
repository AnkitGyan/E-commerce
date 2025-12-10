import express from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, forgotPassword, resetPassword, getAllUsers, getSingleUser, updateUserRole, deleteUser  } from "../controllers/userController.js";  
import { roleBasedAccess, veryifyUser,  } from "../middlewares/userAuth.js";
import { get } from "http";

const router = express.Router();    
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/passsword/update", veryifyUser, updateUserProfile); 
router.post("/password/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);
router.get("/me", veryifyUser, getUserProfile);
router.put("/me/update", veryifyUser, updateUserProfile); 
router.get("/admin/users", veryifyUser, roleBasedAccess("admin"), getAllUsers);
router.get("/admin/user/:id", veryifyUser, roleBasedAccess("admin"), getSingleUser);
router.put("/admin/user/:id", veryifyUser, roleBasedAccess("admin"), updateUserRole);
router.delete("/admin/user/:id", veryifyUser, roleBasedAccess("admin"), deleteUser);

export default router;