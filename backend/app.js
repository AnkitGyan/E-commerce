import express from 'express';
import cors from "cors";
const app = express();
import errorHandleMiddleware from "./middlewares/Error.js";
import productsRoutes from "./routes/productsRoutes.js"
export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/v1", productsRoutes);

// app.get("/", (req, res)=>{
//   res.status(200).json({
//     message : "request coming successfully"
//   })
// });

//Global Error Handler
app.use(errorHandleMiddleware);