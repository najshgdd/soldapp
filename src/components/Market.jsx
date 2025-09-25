import React from 'react';

const Market = () => {
  return (
    <section className="market" id="market">
      <div className="container">
        <h2 className="section-title">Live <span className="text-accent">Market</span> Prices</h2>

        <div className="market-header">
          <div className="market-tabs">
            <button className="market-tab active">All</button>
            <button className="market-tab">Gainers</button>
            <button className="market-tab">Losers</button>
            <button className="market-tab">Favorites</button>
          </div>

          <div className="market-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search cryptocurrencies..." />
          </div>
        </div>

        <div className="market-table-container">
          <table className="market-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>24h Volume</th>
                <th>Market Cap</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="coin-info">
                    <div className="coin-icon">
                      <img src="/assets/bitcoin-icon.webp" alt="Bitcoin" />
                    </div>
                    <div>
                      <div className="coin-name">Bitcoin</div>
                      <div className="coin-symbol">BTC</div>
                    </div>
                  </div>
                </td>
                <td>$42,856.12</td>
                <td><span className="price-change positive">+2.45%</span></td>
                <td>$24.5B</td>
                <td>$820.3B</td>
                <td>
                  <div className="market-actions">
                    <button className="market-btn buy">Buy</button>
                    <button className="market-btn sell">Sell</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="coin-info">
                    <div className="coin-icon">
                      <img src="/assets/ethereum-icon.png" alt="Ethereum" />
                    </div>
                    <div>
                      <div className="coin-name">Ethereum</div>
                      <div className="coin-symbol">ETH</div>
                    </div>
                  </div>
                </td>
                <td>$2,345.67</td>
                <td><span className="price-change positive">+1.23%</span></td>
                <td>$12.8B</td>
                <td>$280.4B</td>
                <td>
                  <div className="market-actions">
                    <button className="market-btn buy">Buy</button>
                    <button className="market-btn sell">Sell</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="coin-info">
                    <div className="coin-icon">
                      <img src="/assets/binance.png" alt="Binance Coin" />
                    </div>
                    <div>
                      <div className="coin-name">Binance Coin</div>
                      <div className="coin-symbol">BNB</div>
                    </div>
                  </div>
                </td>
                <td>$305.89</td>
                <td><span className="price-change negative">-0.78%</span></td>
                <td>$1.5B</td>
                <td>$46.2B</td>
                <td>
                  <div className="market-actions">
                    <button className="market-btn buy">Buy</button>
                    <button className="market-btn sell">Sell</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="coin-info">
                    <div className="coin-icon">
                      <img src="/assets/solana.png" alt="Solana" />
                    </div>
                    <div>
                      <div className="coin-name">Solana</div>
                      <div className="coin-symbol">SOL</div>
                    </div>
                  </div>
                </td>
                <td>$98.76</td>
                <td><span className="price-change positive">+5.32%</span></td>
                <td>$2.1B</td>
                <td>$38.9B</td>
                <td>
                  <div className="market-actions">
                    <button className="market-btn buy">Buy</button>
                    <button className="market-btn sell">Sell</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="coin-info">
                    <div className="coin-icon">
                      <img src="/assets/ripple.png" alt="XRP" />
                    </div>
                    <div>
                      <div className="coin-name">XRP</div>
                      <div className="coin-symbol">XRP</div>
                    </div>
                  </div>
                </td>
                <td>$0.5421</td>
                <td><span className="price-change negative">-1.12%</span></td>
                <td>$800M</td>
                <td>$28.7B</td>
                <td>
                  <div className="market-actions">
                    <button className="market-btn buy">Buy</button>
                    <button className="market-btn sell">Sell</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="coin-info">
                    <div className="coin-icon">
                      <img src="/assets/cardano.png" alt="Cardano" />
                    </div>
                    <div>
                      <div className="coin-name">Cardano</div>
                      <div className="coin-symbol">ADA</div>
                    </div>
                  </div>
                </td>
                <td>$0.3789</td>
                <td><span className="price-change positive">+0.45%</span></td>
                <td>$600M</td>
                <td>$13.4B</td>
                <td>
                  <div className="market-actions">
                    <button className="market-btn buy">Buy</button>
                    <button className="market-btn sell">Sell</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Market;