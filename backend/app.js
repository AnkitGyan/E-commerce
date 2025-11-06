import express from 'express';
const app = express();
import product from "./routes/productsRoutes.js"
export default app;

app.use("/api/v1", product);