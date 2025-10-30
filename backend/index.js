import app from './app.js'
import dotenv from 'dotenv';
dotenv.config({path: 'backend\config\config.env'})
app.get("/api/v1/products", (req, res)=>{
  res.json({
    message : 'working',
  })
})

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Server is running on PORT ${process.env.PORT}`);
})