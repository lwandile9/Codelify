import React, { useEffect, useState } from "react";
import "./css/BlogPost.css";  // CSS file for styling
 
const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
 
  useEffect(() => {
    fetch("http://localhost:3000/blog")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false); // Data loaded, stop loading
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setLoading(false); // Stop loading even on error
      });
  }, []);
 
  return (
    <div className="blog-container">
      {loading ? (
        <div className="loader"></div> // Loading message
      ) : (
        posts.map((post) => (
          <div className="blog-post" key={post.id}>
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-meta">
                By {post.author} on {new Date(post.date).toLocaleDateString()}
              </p>
              <p className="blog-excerpt">
                {post.content.substring(0, 100)}... {/* Show first 100 characters */}
              </p>
              <button className="read-more">Read More</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
 
export default BlogPost;