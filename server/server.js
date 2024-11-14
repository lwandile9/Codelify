// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const firebaseAdmin = require("firebase-admin");
const cookieParser = require('cookie-parser');  // Make sure this is here
const blogRoutes = require("./blogPosts");  // Correct file name
 
 
// Firebase Admin SDK initialization
const serviceAccount = require("./codlify-secret-key.json");
 
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
 
// Firebase Firestore reference
const db = firebaseAdmin.firestore();
 
// Initialize Express app
const app = express();
const PORT = 3000; // Manually setting the port
 
// CORS configuration with credentials
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Allow sending cookies or headers like Authorization
};
 
app.use(cors(corsOptions)); // Apply CORS configuration
app.use(cookieParser()); // Enable parsing cookies in requests
app.use(express.json()); // Add JSON body parsing if needed
app.use(express.urlencoded({ extended: true })); // Handle URL-encoded data
 
// Session middleware setup (No environment variables)
app.use(
  session({
    secret: "your-secret-key",  // Set your session secret directly here
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Explicitly set to false for HTTP (no need for HTTPS)
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
    },
  })
);
 
// Import routes
const authRoutes = require("./auth");
 
 
// Use routes
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes(db)); // Pass the Firestore database to routes
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 