const express = require("express");
const bcrypt = require("bcryptjs");
const firebaseAdmin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Firebase Firestore and Authentication references
const usersRef = firebaseAdmin.firestore().collection("admins");
const auth = firebaseAdmin.auth();

// SignUp (Create User)
router.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if the user already exists
		const userSnapshot = await usersRef.where("email", "==", email).get();
		if (!userSnapshot.empty) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Add new user to Firestore
		const userDoc = await usersRef.add({ email, password: hashedPassword });
		res.status(201).json({ id: userDoc.id, email });
	} catch (error) {
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

		const userDoc = userSnapshot.docs[0].data();
		const match = await bcrypt.compare(password, userDoc.password);

		if (!match) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Create a JWT token
		const token = jwt.sign(
			{ id: userSnapshot.docs[0].id, email },
			"secretKey",
			{
				expiresIn: "1h",
			}
		);

		// Store user session
		req.session.user = { email };
		res.json({ message: "Logged in successfully", token });
	} catch (error) {
		res.status(500).json({ error: "Login failed" });
	}
});

// Password Reset (Request)
router.post("/password-reset", async (req, res) => {
	const { email } = req.body;
	try {
		// Send password reset email via Firebase Auth
		await auth.generatePasswordResetLink(email);
		res.status(200).json({ message: "Password reset email sent" });
	} catch (error) {
		res.status(500).json({ error: "Error sending password reset email" });
	}
});

module.exports = router;
