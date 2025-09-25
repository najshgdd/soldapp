import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = ({ onOpenModal }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header id="header">
      <div className="container header-container">
        <div className="logo">
          <img src="/assets/logo.png" alt="tekieTrading Logo" />
          <span className="logo-text">tekieTrading</span>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <a href="/" className="active">Home</a>
          <a href="#market">Market</a>
          <a href="#about">About</a>
          <a href="#blog">Blog</a>
          <a href="#support">Support</a>
        </nav>

        <div className={`nav-buttons ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <a href="#" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); onOpenModal('login-modal'); }}>Login</a>
          <a href="#" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onOpenModal('signup-modal'); }}>Sign Up</a>
          <WalletMultiButton className="btn btn-primary" />
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .nav-links.mobile-active, .nav-buttons.mobile-active {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 70px; /* Adjust based on header height */
            left: 0;
            width: 100%;
            background-color: var(--primary-bg);
            padding: 1rem 0;
            gap: 1rem;
          }
          .nav-links {
            display: none;
          }
          .nav-buttons {
             display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;