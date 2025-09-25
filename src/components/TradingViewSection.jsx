import React, { useEffect, useRef } from 'react';

const TradingViewSection = () => {
  const tradingViewRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (tradingViewRef.current && typeof TradingView !== 'undefined') {
        new window.TradingView.widget({
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#0a0a0a",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "studies": [
            "MACD@tv-basicstudies",
            "RSI@tv-basicstudies",
            "Volume@tv-basicstudies"
          ],
          "container_id": "tradingview-chart"
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <section className="trading-view">
      <div className="container">
        <h2 className="section-title">Advanced <span className="text-accent">Charting</span> Tools</h2>
        <div className="trading-container" id="tradingview-chart" ref={tradingViewRef}></div>
      </div>
    </section>
  );
};

export default TradingViewSection;