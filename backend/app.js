import express from 'express';
import cors from "cors";
const app = express();
import errorHandleMiddleware from "./middlewares/Error.js";
import productsRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import client from './metrics/index.js';
import { metricsMiddleware } from './middlewares/metricsMiddleware.js';
export default app;


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use(metricsMiddleware);

app.use("/api/v1", productsRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", paymentRoutes);

// app.get("/", (req, res)=>{
//   res.status(200).json({
//     message : "request coming successfully"
//   })
// });

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

//Global Error Handler
app.use(errorHandleMiddleware);