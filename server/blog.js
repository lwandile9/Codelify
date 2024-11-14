// routes/blogPosts.js
const express = require("express");
const router = express.Router();

module.exports = function (db) {
	// Route to get all blog posts
	router.get("/blogPosts", (req, res) => {
		db.collection("blogPosts")
			.get()
			.then((snapshot) => {
				let posts = [];
				snapshot.forEach((doc) => {
					posts.push({ id: doc.id, ...doc.data() }); // Include document ID with the data
				});
				res.json(posts); // Return posts as JSON
			})
			.catch((error) => {
				console.error("Error fetching blog posts: ", error);
				res.status(500).json({
					error: "Error fetching posts",
					message: error.message,
				});
			});
	});

	// Route to get a single blog post by title
	router.get("/blogPosts/title/:title", (req, res) => {
		const title = req.params.title;
		db.collection("blogPosts")
			.where("title", "==", title)
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					return res.status(404).json({ error: "Post not found" });
				}
				const posts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				res.json(posts[0]); // Assuming title is unique, return the first match
			})
			.catch((error) => {
				console.error("Error fetching post by title: ", error);
				res.status(500).json({
					error: "Error fetching post by title",
					message: error.message,
				});
			});
	});

	// Route to delete a blog post by ID
	router.delete("/blogPosts/:id", (req, res) => {
		const postId = req.params.id;
		db.collection("blogPosts")
			.doc(postId)
			.delete()
			.then(() => {
				res.json({ message: "Post successfully deleted" });
			})
			.catch((error) => {
				console.error("Error deleting post: ", error);
				res.status(500).json({
					error: "Error deleting post",
					message: error.message,
				});
			});
	});

	// Route to update a blog post by ID
	router.put("/blogPosts/:id", (req, res) => {
		const postId = req.params.id;
		const updatedData = req.body;

		db.collection("blogPosts")
			.doc(postId)
			.update(updatedData)
			.then(() => {
				res.json({ message: "Post successfully updated" });
			})
			.catch((error) => {
				console.error("Error updating post: ", error);
				res.status(500).json({
					error: "Error updating post",
					message: error.message,
				});
			});
	});

	// Route to insert a new blog post
	router.post("/blogPosts", (req, res) => {
		const newPost = req.body; // Get the post data from the request body

		db.collection("blogPosts")
			.add(newPost) // Add the new post to Firestore
			.then((docRef) => {
				res.json({
					message: "Post successfully created",
					id: docRef.id,
					data: newPost,
				});
			})
			.catch((error) => {
				console.error("Error creating new post: ", error);
				res.status(500).json({
					error: "Error creating new post",
					message: error.message,
				});
			});
	});

	return router; // Return the router to be used in the server
};
