  import { wrapAsync } from "../middlewares/wrapAsync.js";
  import { UserModel } from "../models/user.js";
  import HandleError from "../utils/handleError.js";  
  import sendToken from "../utils/jwtToken.js";

  

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
    sendToken(user, 201, res);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
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
   res.status(200).json({
     success: true,
     message: "User logged in successfully",
     user,
   });
 })

 export const logoutUser = wrapAsync(async (req, res, next)=>{
   res.cookie("token", null, {
     expires: new Date(Date.now()),
     httpOnly: true,
   });  
    res.status(200).json({  
      success: true,
      message: "User logged out successfully",
    });
 });

 export const getUserProfile = wrapAsync(async (req, res, next)=>{
   const user = await UserModel.findById(req.user.id);
   res.status(200).json({
     success: true,
     user,
   });
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
