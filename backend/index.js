import app from './app.js';
import dotenv from 'dotenv';
import connectMongoDb from './config/db.js';
dotenv.config({ path: './config/config.env' });
connectMongoDb();

process.on("unhandledRejection", (err)=>{
  console.log(`error : ${err.msg}`);
  console.log("Server is shuting down due to unhandled promise rejection");
    process.exit(1);
})

const PORT = process.env.PORT

 const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

process.on("unhandledRejection", (err)=>{
  console.log(`error : ${err.msg}`);
  console.log("Server is shuting down due to unhandled promise rejection");
  server.close(()=>{
    process.exit(1);
  })
})
