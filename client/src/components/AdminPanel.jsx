import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './css/AdminPanel.css';

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="admin-container">
        <button onClick={toggleSidebar} className="toggle-button">☰</button>
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/post-new" element={<BlogPostingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Sidebar = ({ open, toggleSidebar }) => (
  <div className={`sidebar ${open ? 'open' : ''}`}>
    <h2 className="title">Codlify Admin</h2>
    <nav className="nav">
      <Link to="/" className="nav-link" onClick={toggleSidebar}>Dashboard</Link>
      <Link to="/post-new" className="post-button" onClick={toggleSidebar}>Post New Blog</Link>
    </nav>
  </div>
);

const Dashboard = () => (
  <div className="dashboard">
    <h1>Dashboard</h1>
    <p>Manage your blog posts and view statistics here.</p>
  </div>
);

const BlogPostingPage = () => (
  <div className="dashboard">
    <h1>Post New Blog</h1>
    <p>Navigate to the blog posting form here.</p>
  </div>
);

export default AdminPanel;
