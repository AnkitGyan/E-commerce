  import { wrapAsync } from "../middlewares/wrapAsync.js";
  import { UserModel } from "../models/user.js";
  import HandleError from "../utils/handleError.js";  
  import sendToken from "../utils/jwtToken.js";
  import { sendEmail } from "../utils/sendEmail.js";
  import crypto from "crypto";

  

  export const registerUser = wrapAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await UserModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample_id",
        url: "sample_url",
      },
    });
    user.password = undefined; 
    sendToken(user, 201, res);
  });

 export const loginUser = wrapAsync(async (req, res, next)=>{
    const { email, password } = req.body;
    if(!email || !password){
      return next(new HandleError(400, "Please provide email and password"));
    } 

    const user = await UserModel.findOne({ email }).select("+password");
    if(!user){
      return next(new HandleError(401, "Invalid email or password"));
    }

    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
      return next(new HandleError(401, "Invalid email or password"));
    }   
 
   sendToken(user, 200, res);
 })

 export const logoutUser = wrapAsync(async (req, res, next)=>{
   res.cookie("token", null, {
     expires: new Date(Date.now()),
     httpOnly: true,
   });  
    return res.status(200).json({  
      success: true,
      message: "User logged out successfully",
    });
 });

 //reset password
 export const forgotPassword = wrapAsync(async (req, res, next)=>{
   const { email } = req.body;
   const user = await UserModel.findOne({ email });
   if(!user){
     return next(new HandleError(404, "User not found with this email"));
   }      
    //Generate reset token  
    const resetToken = user.getResetPasswordToken();  
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;  
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try{
      await sendEmail({
        email: user.email,
        subject: "E-Commerce Password Recovery",
        message,
      }); 
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    }       
    catch(err){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new HandleError(500, err.message));   
    }     
  }); 

  //reset password
  export const resetPassword = wrapAsync(async (req, res, next)=>{
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");   
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    }); 
    if(!user){    
      return next(new HandleError(400, "Reset password token is invalid or has been expired")); 
    } 
    if(req.body.password !== req.body.confirmPassword){ 
      return next(new HandleError(400, "Password does not match"));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save(); 
    sendToken(user, 200, res); 
  });

 export const getUserProfile = wrapAsync(async (req, res, next)=>{
   const user = await UserModel.findById(req.user.id);
   res.status(200).json({
     success: true,
     user,
   });
 });    

 //update user password
 export const updateUserPassword = wrapAsync(async (req, res, next)=>{  
    const user = await UserModel.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
      return next(new HandleError(400, "Old password is incorrect")); 
    } 
    if(req.body.newPassword !== req.body.confirmPassword){  
      return next(new HandleError(400, "Password does not match"));   
    }
    user.password = req.body.newPassword;
    await user.save(); 
    sendToken(user, 200, res); 
  });

  export const updateUserProfile = wrapAsync(async (req, res, next)=>{  
    const user = await UserModel.findByIdAndUpdate( 
      req.user.id,    
      req.body,
      {
        new: true,      
        runValidators: true,  
        useFindAndModify: false,
      }     
    );      
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  }
);  

// amdmin get user list
export const getAllUsers = wrapAsync(async (req, res, next)=>{  
  const users = await UserModel.find(); 
  res.status(200).json({      
    success: true,  
    users,
  });
} );

//admin get single user details 
export const getSingleUser = wrapAsync(async (req, res, next)=>{  
  const user = await UserModel.findById(req.params.id); 
  if(!user){
    return next(new HandleError(404, `User does not exist with Id: ${req.params.id}`));
  }   
  res.status(200).json({  
    success: true,  
    user,     
  }); 
});

//admin update user role
export const updateUserRole = wrapAsync(async (req, res, next)=>{  
  const user = await UserModel.findByIdAndUpdate(
    req.params.id,    
    req.body,
    {
      new: true,      
      runValidators: true,
      useFindAndModify: false,
    }     
  );    
  if(!user){
    return next(new HandleError(404, `User does not exist with Id: ${req.params.id}`));
  }     
  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user,
  });
});

//admin delete user
export const deleteUser = wrapAsync(async (req, res, next)=>{  
  const user = await UserModel.findById(req.params.id);     
  if(!user){  
    return next(new HandleError(404, `User does not exist with Id: ${req.params.id}`)); 
  } 
  await user.deleteOne(); 
  res.status(200).json({    
    success: true,  
    message: "User deleted successfully",
  });
});  

