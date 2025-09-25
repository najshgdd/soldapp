import React from 'react';

const Footer = () => {
  return (
    <footer id="support">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/assets/logo.png" alt="tekieTrading Logo" />
              <span className="footer-logo-text">tekieTrading</span>
            </div>
            <p className="footer-description">Professional cryptocurrency trading platform offering secure and advanced tools for traders of all levels.</p>

            <div className="footer-social">
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-telegram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-discord"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#market">Market</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#">Spot Trading</a></li>
              <li><a href="#">Futures Trading</a></li>
              <li><a href="#">Staking</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Institutional</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Risk Disclosure</a></li>
              <li><a href="#">AML Policy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Newsletter</h3>
            <p className="footer-description">Subscribe to our newsletter for the latest updates and market insights.</p>

            <form className="newsletter-form">
              <input type="email" placeholder="Your Email" className="newsletter-input" required />
              <button type="submit" className="newsletter-btn">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2023 tekieTrading. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;