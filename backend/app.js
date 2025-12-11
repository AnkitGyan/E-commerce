import express from 'express';
import cors from "cors";
const app = express();
import errorHandleMiddleware from "./middlewares/Error.js";
import productsRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.use("/api/v1", productsRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/", orderRoutes)

// app.get("/", (req, res)=>{
//   res.status(200).json({
//     message : "request coming successfully"
//   })
// });

//Global Error Handler
app.use(errorHandleMiddleware);