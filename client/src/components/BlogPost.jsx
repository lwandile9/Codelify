import React, { useEffect, useState } from "react";
import "./css/fetchBlogInit.css";  // CSS file for styling

const BlogPost = () => {

    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedBlogId, setExpandedBlogId] = useState(null);

    // Fetch blogs from API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {  
                const response = await fetch('http://localhost:3000/blog/blogPosts');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    // Filtered blogs based on search term
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Toggle expanded view
    const toggleReadMore = (id) => {
        setExpandedBlogId(expandedBlogId === id ? null : id);
    };

    return (
        <div className="blog-post-list-container">
            <h2 className="blog-post-heading">Our Blog Posts</h2>

            <input
                type="text"
                placeholder="Search blogs by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="blog-post-search-input"
            />

            <div className="blog-post-card-container">
                {filteredBlogs.map(blog => (
                    <div key={blog.id} className="blog-post-card">
                        <h3 className="blog-post-title">{blog.title}</h3>
                        <p className="blog-post-author">By: {blog.author}</p>
                        <p className="blog-post-intro">{blog.intro}</p>

                        {expandedBlogId === blog.id ? (
                            <>
                                <p className="blog-post-content">{blog.content}</p>
                                <p className="blog-post-conclusion">{blog.conclusion}</p>
                                <button onClick={() => toggleReadMore(blog.id)} className="blog-post-read-more-btn">
                                    Show Less
                                </button>
                            </>
                        ) : (
                            <button onClick={() => toggleReadMore(blog.id)} className="blog-post-read-more-btn">
                                Read More
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPost;