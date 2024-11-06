import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/nav.css';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar main-nav">
      <a className="navbar-brand" href="#">Codlify</a>

      {/* Toggler for mobile view */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleNavCollapse}
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">☰</span>
      </button>

      {/* Collapsible menu */}
      <div className={`navbar-collapse container ${isNavCollapsed ? '' : 'show'}`} id="navbarNav">
        <ul className="navbar-nav nav-list roboto-bold">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link">Blog</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
