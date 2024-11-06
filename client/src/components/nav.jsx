import { Link } from "react-router-dom"; // Removed unused Outlet import

const Nav = () => {
  return (
    <nav className="main-nav">
      <ul className="nav-list"> 
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/blog">Blog</Link></li> 
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
