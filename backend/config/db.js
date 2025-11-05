import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log("Database connected successfully");
})
.catch((err) => {
  console.error("Database connection failed:", err);
});
