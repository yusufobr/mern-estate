import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Run server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});


// Routes
app.use("/api/user", userRoute);