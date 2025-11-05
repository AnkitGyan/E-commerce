import app from './app.js';
import dotenv from 'dotenv';


dotenv.config({ path: './config/config.env' });

app.get("/api/v1/products", (req, res) => {
  res.json({
    message: 'working',
  });
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
