// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const firebaseAdmin = require("firebase-admin");
const path = require("path");

// Firebase Admin SDK initialization
const serviceAccount = require("./codlify-secret-key.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Firebase Firestore reference
const db = firebaseAdmin.firestore();

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use true for HTTPS
  })
);

// Blog route
// Import the blogPosts route
const blogRoutes = require("./blogPosts");  // Correct path if blogPosts.js is directly under the 'server' folder

app.use("/blog", blogRoutes(db)); // Use the route with Firestore integration

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
