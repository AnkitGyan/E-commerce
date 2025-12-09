import { wrapAsync } from "./wrapAsync.js";
import { UserModel } from "../models/user.js";
import HandleError from "../utils/handleError.js";  


export const veryifyUser = wrapAsync(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(new HandleError(401, "Please login to access this resource"));
    } 
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id);
    next(); 
});

export const roleBasedAccess = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {   
        return next(new HandleError(403, `Role: ${req.user.role} is not allowed to access this resource`));
      }
      next();
    };
};
