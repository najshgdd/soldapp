import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroChartRef = useRef(null);

  useEffect(() => {
    // Check if the TradingView script is already loaded
    if (window.TradingView) {
      createWidget();
    } else {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = createWidget;
      document.body.appendChild(script);

      return () => {
        // Clean up the script if the component unmounts before it loads
        document.body.removeChild(script);
      }
    }
  }, []);

  const createWidget = () => {
    if (heroChartRef.current && typeof window.TradingView !== 'undefined') {
      new window.TradingView.widget({
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#0a0a0a",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_side_toolbar": true,
        "allow_symbol_change": false,
        "container_id": heroChartRef.current.id
      });
    }
  };

  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text fade-in">
          <h1 className="hero-title">Trade <span className="text-gradient">Cryptocurrency</span> With Confidence</h1>
          <p className="hero-subtitle">Access advanced trading tools, real-time market data, and secure transactions on our professional platform.</p>

          <div className="hero-buttons">
            <a href="#" className="btn btn-primary btn-lg">Start Trading Now</a>
            <a href="#" className="btn btn-secondary btn-lg">Learn More</a>
          </div>

          <div className="hero-stats">
            <div className="stat-item fade-in delay-1">
              <div className="stat-number">$2.5B+</div>
              <div className="stat-label">24h Volume</div>
            </div>
            <div className="stat-item fade-in delay-2">
              <div className="stat-number">1M+</div>
              <div className="stat-label">Active Traders</div>
            </div>
            <div className="stat-item fade-in delay-3">
              <div className="stat-number">150+</div>
              <div className="stat-label">Cryptocurrencies</div>
            </div>
          </div>
        </div>

        <div className="hero-visual fade-in delay-1">
          <div className="hero-chart" id="hero-chart" ref={heroChartRef}></div>
          <div className="floating-coins">
            <div className="coin"></div>
            <div className="coin"></div>
            <div className="coin"></div>
            <div className="coin"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;