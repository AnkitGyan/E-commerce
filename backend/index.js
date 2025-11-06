import app from './app.js';
import dotenv from 'dotenv';
import connectMongoDb from './config/db.js';
dotenv.config({ path: './config/config.env' });
connectMongoDb();

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
