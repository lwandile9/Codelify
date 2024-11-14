import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/post.css';

const Post = () => {
    const { id } = useParams(); // Extract the blog post ID from the URL
    const [formData, setFormData] = useState({
        title: '',
        intro: '',
        content: '',
        conclusion: '',
        author: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Track if we’re editing an existing post

    // Fetch the blog post data if an ID is present
    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`http://localhost:3000/blog/blogPosts/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch post");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFormData({
                        title: data.title,
                        intro: data.intro,
                        content: data.content,
                        conclusion: data.conclusion,
                        author: data.author
                    });
                    setIsEditMode(true); // Set to edit mode
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setError("Failed to load post data.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, intro, content, conclusion, author } = formData;

        // Validate all fields are filled
        if (!title || !intro || !content || !conclusion || !author) {
            setError("All fields are required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const url = id 
                ? `http://localhost:3000/blog/blogPosts/${id}` 
                : "http://localhost:3000/blog/blogPosts";
            const method = id ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to submit post");
            }

            alert(id ? "Post updated successfully!" : "Post created successfully!");
            if (!id) { // Clear form only if it’s a new post
                setFormData({ title: "", intro: "", content: "", conclusion: "", author: "" });
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to submit post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2 className="create-post-heading">
                    {isEditMode ? "Edit Blog Post" : "Create Blog Post"}
                </h2>

                {error && <p className="error-message">{error}</p>}
                {loading && <div className="loading-animation">Loading...</div>}

                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Write title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label>Intro:</label>
                <input
                    type="text"
                    name="intro"
                    placeholder="Write intro"
                    value={formData.intro}
                    onChange={handleChange}
                    required
                />

                <label>Content:</label>
                <textarea
                    name="content"
                    placeholder="Write content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                ></textarea>

                <label>Conclusion:</label>
                <textarea
                    name="conclusion"
                    placeholder="Write conclusion"
                    value={formData.conclusion}
                    onChange={handleChange}
                    required
                ></textarea>

                <label>Author:</label>
                <input
                    type="text"
                    name="author"
                    placeholder="Write author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {isEditMode ? "Update Post" : "Create Post"}
                </button>
            </form>
        </>
    );
};

export default Post;
