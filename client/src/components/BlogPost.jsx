import React, { useEffect, useState } from "react";
import '/src/components/css/fetchBlogInit.css';





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

  // Format the createdAt date for better readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);  // Parse the date string

    if (isNaN(date)) {
      return "Invalid date";  // Fallback if the date is invalid
    }

    return date.toLocaleDateString("en-GB", {
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric"
    });
  };

  return (
    <div className="blog-post-list-container">
      {/* Show Search Bar Only When No Post is Expanded */}
      {expandedBlogId === null && (
        <>
          <h2 className="blog-post-heading">Our Blog Posts</h2>
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="blog-post-search-input"
          />
        </>
      )}

      {/* Show Only the Expanded Post, Hide All Others */}
      <div className="blog-post-card-container">
        {expandedBlogId === null
          ? filteredBlogs.map(blog => (
              <div key={blog.id} className="blog-post-card">
                <h3 className="blog-post-title">{blog.title}</h3>
                <p className="blog-post-author">By: {blog.author}</p>
                <p className="blog-post-intro">{blog.intro}</p>
                <button
                  onClick={() => toggleReadMore(blog.id)}
                  className="blog-post-read-more-btn"
                >
                  Read More
                </button>
              </div>
            ))
          : filteredBlogs
              .filter(blog => blog.id === expandedBlogId)
              .map(blog => (
                <div key={blog.id} className="expanded-blog-post">
                  <h3 className="expanded-blog-post-title">{blog.title}</h3>
                  <p className="expanded-blog-post-author">By: {blog.author}</p>
                  <p className="expanded-blog-post-createdAt">
                    Published on: {formatDate(blog.createdAt)}
                  </p>
                  <div className="expanded-blog-post-content">{blog.content}</div>
                  <p className="expanded-blog-post-conclusion">
                    Conclusion: {blog.conclusion}
                  </p>
                  <button
                    onClick={() => toggleReadMore(null)}
                    className="expanded-blog-post-read-more-btn"
                  >
                    Show Less
                  </button>
                </div>
              ))}
      </div>
    </div>
  );
};

export default BlogPost;
