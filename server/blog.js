const express = require("express");
const router = express.Router();

// Blog Post Routes (CRUD)
module.exports = (db) => {
	const blogPostsRef = db.collection("blogPosts");

	// Create a new blog post (POST)
	router.post("/blogPosts", async (req, res) => {
		try {
			const { title, intro, content, author, conclusion } = req.body;

			if (!title || !intro || !content || !author) {
				return res
					.status(400)
					.json({ error: "Title, Intro, content, and author are required" });
			}

			const newPost = {
				title,
				intro,
				content,
				author,
				conclusion,
				createdAt: new Date().toISOString(),
			};

			const docRef = await blogPostsRef.add(newPost);
			res.status(201).json({ id: docRef.id, ...newPost });
		} catch (error) {
			res.status(500).json({ error: "Failed to create blog post" });
		}
	});

	// Get all blog posts (GET)
	router.get("/blogPosts", async (req, res) => {
		try {
			const snapshot = await blogPostsRef.get();
			const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			res.json(posts);
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch blog posts" });
		}
	});

	// Get a specific blog post by ID (GET)
	router.get("/blogPosts/:id", async (req, res) => {
		try {
			const { id } = req.params;
			const postRef = blogPostsRef.doc(id);
			const doc = await postRef.get();

			if (!doc.exists) {
				return res.status(404).json({ error: "Blog post not found" });
			}

			res.json({ id: doc.id, ...doc.data() });
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch blog post" });
		}
	});

	// Update a blog post (PUT)
	router.put("/blogPosts/:id", async (req, res) => {
		try {
			const { id } = req.params;
			const { title, content, conclusion } = req.body;

			const updatedPost = { title, content, conclusion };

			// Check if the blog post exists
			const postRef = blogPostsRef.doc(id);
			const doc = await postRef.get();
			if (!doc.exists) {
				return res.status(404).json({ error: "Blog post not found" });
			}

			await postRef.update(updatedPost);
			res.json({ id, ...updatedPost });
		} catch (error) {
			res.status(500).json({ error: "Failed to update blog post" });
		}
	});

	// Delete a blog post (DELETE)
	router.delete("/blogPosts/:id", async (req, res) => {
		try {
			const { id } = req.params;

			// Check if the blog post exists
			const postRef = blogPostsRef.doc(id);
			const doc = await postRef.get();
			if (!doc.exists) {
				return res.status(404).json({ error: "Blog post not found" });
			}

			await postRef.delete();
			res.status(200).json({ message: "Blog post deleted successfully" });
		} catch (error) {
			res.status(500).json({ error: "Failed to delete blog post" });
		}
	});

	// Search blog posts by title or ID (GET)
	router.get("/blogPosts/search", async (req, res) => {
		try {
			const { title, id } = req.query;
			let query = blogPostsRef;

			// Search by title or ID if specified
			if (title) {
				query = query.where("title", "==", title);
			}
			if (id) {
				query = query.doc(id);
			}

			const snapshot = await query.get();
			const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

			if (posts.length === 0) {
				return res.status(404).json({ error: "No matching blog posts found" });
			}

			res.json(posts);
		} catch (error) {
			res.status(500).json({ error: "Search failed" });
		}
	});

	return router;
};
s;
