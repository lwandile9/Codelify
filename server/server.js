// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const firebaseAdmin = require("firebase-admin");

// Firebase Admin SDK initialization
const serviceAccount = require("./codlify-secret-key.json");

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
	// No need for databaseURL for Firestore
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

// Import routes
const authRoutes = require("./auth");
const blogRoutes = require("./blog");

// Use routes
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes(db)); // Pass the Firestore database to routes

// Start the server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
