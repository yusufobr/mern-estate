import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import likeRouter from "./routes/like.route.js";
import commentRouter from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use the provided PORT by Heroku or default to 3000

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOO)
  .then(() => {
    console.log("Connected to MongoDB");
    // Run server after MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

// allow the json data to be parsed by express
app.use(express.json());

// allow the cookie to be parsed by express
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/like", likeRouter);
app.use("/api/comment", commentRouter);

//
app.use(express.static(path.join(__dirname, "/client/dist")));

// redirect any other route to the index.html file in client/dist
app.get("*", (req, res) => {
  res.json("404");
});

// Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
