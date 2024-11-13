const express = require("express");
const bcrypt = require("bcryptjs");
const firebaseAdmin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Initialize Firebase Admin SDK (Ensure it's properly initialized in your main server file)
const db = firebaseAdmin.firestore();
const usersRef = db.collection("admins");
const auth = firebaseAdmin.auth();

// Sign Up (Create User)
router.post("/signup", async (req, res) => {
	try {
		const { name, email, password } = req.body; // Accept name, email, and password

		// Check if the user already exists
		const userSnapshot = await usersRef.where("email", "==", email).get();
		if (!userSnapshot.empty) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Add new user to Firestore
		const newUser = {
			name, // Include name in the user data
			email,
			password: hashedPassword,
		};
		const userDoc = await usersRef.add(newUser);

		res.status(201).json({ id: userDoc.id, name, email }); // Return the id, name, and email
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).json({ error: "Failed to create account" });
	}
});

// Login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Get user by email
		const userSnapshot = await usersRef.where("email", "==", email).get();
		if (userSnapshot.empty) {
			return res.status(400).json({ error: "User not found" });
		}

		const userDoc = userSnapshot.docs[0];
		const userData = userDoc.data();

		// Compare hashed password
		const match = await bcrypt.compare(password, userData.password);
		if (!match) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Create a JWT token
		const token = jwt.sign(
			{ id: userDoc.id, email },
			"secretKey", // Use a more secure key in production
			{
				expiresIn: "1h",
			}
		);

		// Store user session if needed
		req.session.user = { email };
		res.json({ message: "Logged in successfully", token });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Login failed" });
	}
});

// Password Reset (Request)
router.post("/password-reset", async (req, res) => {
	const { email } = req.body;
	try {
		// Send password reset email via Firebase Auth
		await auth.sendPasswordResetEmail(email);
		res.status(200).json({ message: "Password reset email sent" });
	} catch (error) {
		console.error("Password reset error:", error);
		res.status(500).json({ error: "Error sending password reset email" });
	}
});

module.exports = router;
