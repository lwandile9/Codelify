// routes/blogPosts.js
const express = require("express");
const router = express.Router();

module.exports = function (db) {
	// Route to get all blog posts
	router.get("/blogPosts", (req, res) => {
		db.collection("posts") // Ensure this is the correct Firestore collection name
			.get()
			.then((snapshot) => {
				let posts = [];
				snapshot.forEach((doc) => {
					posts.push(doc.data()); // Push the blog post data
				});
				res.json(posts); // Return the posts as a JSON response
			})
			.catch((error) => {
				console.error("Error fetching blog posts: ", error);
				res.status(500).json({
					error: "Error fetching posts",
					message: error.message,
				});
			});
	});

	return router; // Return the router to be used in the server
};
