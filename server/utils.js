const firebaseAdmin = require("firebase-admin");

// Utility function for password reset
const sendPasswordResetEmail = async (email) => {
	try {
		await firebaseAdmin.auth().generatePasswordResetLink(email);
		console.log("Password reset link sent");
	} catch (error) {
		console.error("Error sending reset email", error);
	}
};

module.exports = { sendPasswordResetEmail };
