require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const BlogRoutes = require('./routes/BlogRoutes');

// express app
const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: ['https://prendster.netlify.app', 'http://localhost:5173'],
}));


// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/blogs', BlogRoutes);

// connect to db
const port = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log("connected to database and listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
