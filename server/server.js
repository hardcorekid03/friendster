require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const BlogRoutes = require("./routes/BlogRoutes");
const UserRoutes = require("./routes/UserRoutes");
const CommentRoutes = require("./routes/CommentRoutes");

const imageRoutes = require("./routes/ImageRoutes");
// const userImageRoutes = require("./routes/userImageRoutes");

const app = express();

// Enable CORS for specified origins
app.use(
  cors({
    origin: [
      "https://prendster.netlify.app",
      "https://prendster.evbgroup.biz",
      "http://localhost:5173",
      "https://friendsterr.vercel.app",
    ],
  })
);

// Middleware
app.use(express.json());

// Serve static files from 'assets/images' directory
app.use("/images", express.static(path.join(__dirname, "assets/images/blogs")));
app.use(
  "/banners",
  express.static(path.join(__dirname, "assets/images/banners"))
);
app.use(
  "/profiles",
  express.static(path.join(__dirname, "assets/images/profiles"))
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/blogs", BlogRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/upload", imageRoutes); // Use imageRoutes for handling image uploads
// app.use("/api/user/images", userImageRoutes); // Use userImageRoutes for user image uploads
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
