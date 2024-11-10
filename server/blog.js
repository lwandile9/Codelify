const express = require("express");
const router = express.Router();

// Blog Post Routes (CRUD)
module.exports = (db) => {
	const blogPostsRef = db.collection("blogPosts");

	// Create a Blog Post
	router.post("/", async (req, res) => {
		try {
			const { title, content, author, conclusion } = req.body;
			const newPost = {
				title,
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

	// Get All Blog Posts
	router.get("/", async (req, res) => {
		try {
			const snapshot = await blogPostsRef.get();
			const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			res.json(posts);
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch blog posts" });
		}
	});

	// Update a Blog Post
	router.put("/:id", async (req, res) => {
		try {
			const { id } = req.params;
			const { title, content, conclusion } = req.body;
			const updatedPost = { title, content, conclusion };

			const postRef = blogPostsRef.doc(id);
			await postRef.update(updatedPost);

			res.json({ id, ...updatedPost });
		} catch (error) {
			res.status(500).json({ error: "Failed to update blog post" });
		}
	});

	// Delete a Blog Post
	router.delete("/:id", async (req, res) => {
		try {
			const { id } = req.params;
			await blogPostsRef.doc(id).delete();
			res.status(200).send("Blog post deleted");
		} catch (error) {
			res.status(500).json({ error: "Failed to delete blog post" });
		}
	});

	// Search Blog Posts by Title or ID
	router.get("/search", async (req, res) => {
		try {
			const { title, id } = req.query;
			let query = blogPostsRef;

			if (title) query = query.where("title", "==", title);
			if (id) query = query.doc(id);

			const snapshot = await query.get();
			const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

			res.json(posts);
		} catch (error) {
			res.status(500).json({ error: "Search failed" });
		}
	});

	return router;
};
