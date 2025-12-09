import HandleError from "../utils/handleError.js";

export default (err, req, res, next)=>{
err.statusCode = err.statusCode || 500;
err.Message = err.Message || "Internal Server Error";

//Cast Error
if(err.name === "CastError"){
  const message = `This is invalid resource ${err.path}`
  err = new HandleError(message, 404)
}
 
//Mongoose duplicate key error
if(err.code === 11000){
  const message = `Duplicate ${Object.keys(err.keyValue)} entered, login to continue`
  err = new HandleError(400, message)
}
//Validation Error
if(err.name === "ValidationError"){
  const message = Object.values(err.errors).map(value => value.message);
  err = new HandleError(400, message)
}

res.status(err.statusCode).json({
  success : false,
  message : err.message
})
}