import { wrapAsync } from "./wrapAsync.js";
import { UserModel } from "../models/user.js";
import HandleError from "../utils/handleError.js";
import jwt from "jsonwebtoken";  


export const veryifyUser = wrapAsync(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new HandleError(401, "Please login to access this resource"));
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new HandleError(401, "Invalid or expired token"));
  }

  const user = await UserModel.findById(decoded.id);

  if (!user) {
    return next(new HandleError(401, "User no longer exists"));
  }

  req.user = user;
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
