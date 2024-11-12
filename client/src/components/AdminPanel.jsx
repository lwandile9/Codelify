import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/AdminPanel.css';

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="admin-container">
      <button onClick={toggleSidebar} className="toggle-button">☰</button>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <h1>Dashboard</h1>
        <p>Manage your blog posts and view statistics here.</p>
      </div>
    </div>
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

export default AdminPanel;
