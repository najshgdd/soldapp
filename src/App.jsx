import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Market from './components/Market';
import Features from './components/Features';
import TradingViewSection from './components/TradingViewSection';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Modals from './components/Modals';
import './App.css';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Initialize AOS and set up timed notification
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });

    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(notificationTimer);
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = (modalId) => {
    setActiveModal(modalId);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <Header onOpenModal={handleOpenModal} />
      <main>
        <Hero />
        <Market />
        <Features />
        <TradingViewSection />
        <CTA />
      </main>
      <Footer />
      <Modals activeModal={activeModal} onCloseModal={handleCloseModal} />

      {/* Notification */}
      {showNotification && (
        <div className="notification active" id="notification">
          <div className="notification-icon">
            <i className="fas fa-bell"></i>
          </div>
          <div className="notification-content">
            <div className="notification-title">Welcome to tekieTrading!</div>
            <div className="notification-message">Sign up now and get 10% discount on trading fees for 30 days.</div>
          </div>
          <div className="notification-close" onClick={() => setShowNotification(false)}>
            <i className="fas fa-times"></i>
          </div>
        </div>
      )}
    </>
  );
}

export default App;