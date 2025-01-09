require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const BlogRoutes = require("./routes/BlogRoutes");
const UserRoutes = require("./routes/UserRoutes");
const CommentRoutes = require("./routes/CommentRoutes");

const app = express();

// Enable CORS for specified origins
app.use(
  cors({
    origin: [
      "https://prendster.netlify.app",
      "http://prendster.evbgroup.biz",
      "http://localhost:5173",
      "https://friendsterr.vercel.app",
      "http://192.168.3.11:5173",
    ],
  })
);

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/blogs", BlogRoutes);
app.use("/api/user", UserRoutes);

app.use("/api/blogs", CommentRoutes); // Use comment routes

// Connect to MongoDB
const port = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Connected to database and listening on port", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
