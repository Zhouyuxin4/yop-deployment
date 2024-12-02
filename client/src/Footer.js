import React from 'react';
import './css/Footer.css'


const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Your travel planning companion</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@yourownplanet.com</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Own Planet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;