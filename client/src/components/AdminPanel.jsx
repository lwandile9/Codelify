import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/AdminPanel.css';
import "./css/fetchBlogInit.css";  // CSS file for styling
import "./css/postblogstyle.css";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState([]); // State to store blog data
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const logout = () => {
    // Perform any logout tasks (e.g., clearing tokens, user data)
    navigate('/home'); // Redirect to home page
  };

  // Fetch blog data from API when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog/blogPosts'); // Replace with your API endpoint
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter blogs by title
  );

  const handleDelete = (blogId) => {
    // Call API to delete blog and update state
    const deleteBlog = async () => {
      try {
        await fetch(`http://localhost:3000/blog/blogPosts/${blogId}`, {
          method: 'DELETE',
        });
        // Remove the deleted blog from the local state
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    };

    deleteBlog();
  };

  const handleEdit = (blogId) => {
    // Redirect to edit page with blog ID
    navigate(`/post/${blogId}`);
  };

  return (
    <div className="admin-container">
      <button onClick={toggleSidebar} className="toggle-button">☰</button>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} logout={logout} />
      
      <div className="main-content">
        <h1>Dashboard</h1>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search blogs..." 
            value={searchQuery}
            onChange={handleSearch}
            className="search-input" 
          />
        </div>
        
        <h2>Blog Posts</h2>
        <div className="posted-blogs">
        <div className="blog-card">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="blog-item">
              <h3>{blog.title}</h3>
              <p>Posted on: {new Date(blog.datePosted).toLocaleDateString()}</p>
              <p>Author: {blog.author}</p>
              <div className="blog-actions">
                <button onClick={() => handleEdit(blog.id)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(blog.id)} className="delete-button">Delete</button>
              </div>
            </div>


          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ open, toggleSidebar, logout }) => (
  <div className={`sidebar ${open ? 'open' : ''}`}>
    <h2 className="title">Codlify Admin</h2>
    <nav className="nav">
      <Link to="/" className="nav-link" onClick={toggleSidebar}>Dashboard</Link>
      <Link to="/post" className="post-button">Post New Blog</Link>
      <button onClick={logout} className="logout-button">Logout</button>
    </nav>
  </div>
);

export default AdminPanel;
