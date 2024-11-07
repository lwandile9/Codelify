// Import necessary modules
const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();
const PORT = 3000;

// Use CORS to allow frontend requests
app.use(cors());

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Introduction to Node.js",
    content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    author: "Gcina",
    createdAt: "2024-11-07",
  },
  {
    id: 2,
    title: "Understanding Express.js",
    content: "Express is a minimal and flexible Node.js web application framework.",
    author: "Gcina",
    createdAt: "2024-11-08",
  },
];

// Define the `/blog` endpoint
app.get('/blog', (req, res) => {
  res.json(blogPosts); // Return the blogPosts array as JSON
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
