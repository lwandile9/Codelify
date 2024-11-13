import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/AdminPanel.css';
import searchBar from './SearchBar';

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (

    <div className="admin-container">
      
      <button onClick={toggleSidebar} className="toggle-button">☰</button>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <h1>Dashboard</h1>
        <div className="search-bar">
    <form className="search-form">
        <input type="text" placeholder="search.." className="search-input" >
        </input>
        <button className="search-button">Search</button>
    </form>
</div>
        <p>Manage your blog posts and view statistics here.</p>
      </div>
      <p></p>
    </div>
  );
};

const Sidebar = ({ open, toggleSidebar }) => (
  <div className={`sidebar ${open ? 'open' : ''}`}>
    <h2 className="title">Codlify Admin</h2>
    <nav className="nav">
      <Link to="/" className="nav-link" onClick={toggleSidebar}>Dashboard</Link>
      <Link to="/post" className="post-button">Post New Blog</Link>
    </nav>
  </div>
);

export default AdminPanel;
