import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../components/css/footer.css';

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container">
          {/* Footer Brand */}
          <div className="footer-brand">
            <a href="#" className="footer-logo">CODLIFY</a>
          </div>

      

          {/* Footer Social Links */}
          <div className="footer-social">
            <ul className="footer-social-icons">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Twitter">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p>&copy; {currentYear} CODLIFY. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
