import express from 'express';
const app = express();
import errorHandleMiddleware from "./middlewares/Error.js";
import productsRoutes from "./routes/productsRoutes.js"
export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", productsRoutes);

//Global Error Handler
app.use(errorHandleMiddleware);