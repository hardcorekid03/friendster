require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const BlogRoutes = require('./routes/BlogRoutes');
const imageRoutes = require('./routes/ImageRoutes'); 
const userImageRoutes = require('./routes/userImageRoutes'); // Import userImageRoutes


const app = express();

// Enable CORS for specified origins
app.use(cors({
  origin: ['https://prendster.netlify.app', 'http://localhost:5173'],
}));

// Middleware
app.use(express.json());

// Serve static files from 'assets/images' directory
app.use('/images', express.static(path.join(__dirname, 'assets/images/blogs')));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/blogs', BlogRoutes);
app.use('/api/upload', imageRoutes); // Use imageRoutes for handling image uploads
app.use('/api/user/images', userImageRoutes); // Use userImageRoutes for user image uploads


// Connect to MongoDB
const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log('Connected to database and listening on port', port);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
