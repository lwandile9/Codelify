import React, { useState } from 'react';

import './css/post.css'
const Post = () => {
    // State for form data and validation
    const [formData, setFormData] = useState({
        title: '',
        intro: '',
        content: '',
        conclusion: '',
        author: ''
    });
    const [error, setError] = useState('');

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
            setError('All fields are required.');
            return;
        }

        setError(''); // Clear error if form is valid

        try {
            const response = await fetch('https://your-backend-endpoint.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit post');
            }

            alert('Post submitted successfully!');
            setFormData({ title: '', intro: '', content: '', conclusion: '', author: '' });
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit post.');
        }
    };

    return (
        <>
            <form className='form-container' onSubmit={handleSubmit}>
                <h2 className='create-post-heading'>Create Blog</h2>

                {error && <p className="error-message">{error}</p>}

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
                    placeholder="Write Intro"
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
                    placeholder="Write Author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Post</button>
            </form>
        </>
    );
};

export default Post;

  