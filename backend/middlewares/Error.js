export default (err, req, res, next)=>{
err.statusCode = err.statusCode || 500;
err.Message = err.Message || "Internal Server Error";

res.status(err.statusCode).json({
  success : false,
  Message : err.Message
})
}