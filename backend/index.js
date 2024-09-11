// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import colors from "colors";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// CORS configuration to allow any origin
app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB".blue.italic);
    // Start the server only after MongoDB connection is established
    app.listen(3000, () => {
      console.log("Server is running on port 3000".yellow.bold);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process if database connection fails
  });

// Import and use routes
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
