import HandleError from "../utils/handleError";

export default (err, req, res, next)=>{
err.statusCode = err.statusCode || 500;
err.Message = err.Message || "Internal Server Error";

//Cast Error
if(err.name === "CastError"){
  const message = `This is invalid resource ${err.path}`
  err = new HandleError(message, 404)
}

res.status(err.statusCode).json({
  success : false,
  Message : err.Message
})
}