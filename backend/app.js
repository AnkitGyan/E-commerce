import express from 'express';
const app = express();
import productsRoutes from "./routes/productsRoutes.js"
export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", productsRoutes);