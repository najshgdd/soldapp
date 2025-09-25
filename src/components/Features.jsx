import React from 'react';

const Features = () => {
  return (
    <section className="features" id="about">
      <div className="container">
        <h2 className="section-title">Why Choose <span className="text-accent">tekieTrading</span></h2>

        <div className="features-grid">
          <div className="feature-card" data-aos="fade-up">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="feature-title">Advanced Security</h3>
            <p className="feature-description">Your assets are protected with institutional-grade security measures including multi-signature wallets and cold storage.</p>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">Experience ultra-fast trade execution with our high-performance matching engine capable of 100,000+ TPS.</p>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="feature-title">Professional Tools</h3>
            <p className="feature-description">Access advanced charting, technical indicators, and trading bots to maximize your trading potential.</p>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="feature-title">24/7 Support</h3>
            <p className="feature-description">Our dedicated support team is available around the clock to assist you with any questions or issues.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;