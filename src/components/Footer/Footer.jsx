import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-column">
        <h3>About Us</h3>
        <p>
          Your go-to store for premium headphones. Experience sound like never
          before.
        </p>
      </div>
      <div className="footer-column">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/plp">Shop</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
        </ul>
      </div>
      <div className="footer-column">
        <h3>Contact</h3>
        <p>Email: support@yourstore.com</p>
        <p>Phone: +1 (234) 567-890</p>
      </div>
      <div className="footer-column social">
        <h3>Follow Us</h3>
        <Link to="/"><i className="media-links fa-brands fa-square-facebook"></i></Link>
        <Link to="/"><i className="media-links fa-brands fa-instagram"></i></Link>
        <Link to="/"><i className="media-links fa-brands fa-x-twitter"></i></Link>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 WaveAura. All rights reserved.</p>
    </div>
  </footer>
    
    </>
  )
}

export default Footer