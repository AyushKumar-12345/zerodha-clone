import React, { useState, useEffect, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"; 

import GeneralContext from "../../context/GeneralContext";
// Point directly to your newly engineered dynamic user functions
import { getUserWatchlist } from "../../data/data";
import DoughnutChart from "../../components/DoughnutChart"; 
import "./WatchList.css";

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChartTicker, setActiveChartTicker] = useState(null);
  const [localWatchlist, setLocalWatchlist] = useState([]);

  // FIX: Force listener synchronization directly to the immutable local registration string token
  const activeUserKey = localStorage.getItem("username") || "Trader";

  useEffect(() => {
    if (getUserWatchlist) {
      setLocalWatchlist(getUserWatchlist());
    }
  }, [activeUserKey]);

  const filteredWatchlist = localWatchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const labels = filteredWatchlist.map((stock) => stock.name);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Price (₹)",
        data: filteredWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)", "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)", "rgba(153, 102, 255, 0.7)", "rgba(255, 159, 64, 0.7)",
          "rgba(74, 213, 192, 0.7)", "rgba(120, 160, 235, 0.7)", "rgba(240, 110, 150, 0.7)"
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-box-row">
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="stock-counter">{filteredWatchlist.length} / 50</span>
      </div>

      <ul className="watchlist-items-list">
        {filteredWatchlist.map((stock) => (
          <WatchListItem 
            stock={stock} 
            key={stock.name} 
            onToggleChart={(symbol) => setActiveChartTicker(activeChartTicker === symbol ? null : symbol)}
            isChartActive={activeChartTicker === stock.name}
          />
        ))}
      </ul>

      <div className="watchlist-chart-wrapper-pane" style={{ position: "relative", height: "300px", padding: "10px", boxSizing: "border-box" }}>
        {activeChartTicker ? (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <button 
              onClick={() => setActiveChartTicker(null)}
              style={{ position: "absolute", top: "5px", right: "10px", zIndex: 10, background: "#f1f1f1", border: "none", borderRadius: "50%", cursor: "pointer", width: "20px", height: "20px", fontSize: "10px" }}
            >
              ✕
            </button>
            <iframe
              title="TradingView Chart"
              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${activeChartTicker}&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=Asia%2FKolkata&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en`}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        ) : (
          <DoughnutChart data={chartData} />
        )}
      </div>
    </div>
  );
};

const WatchListItem = ({ stock, onToggleChart, isChartActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className="watchlist-li-item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="stock-info-row">
        <span className={`stock-ticker-name ${stock.isDown ? "trend-down" : "trend-up"}`}>
          {stock.name}
        </span>
        
        {isHovered ? (
          <WatchListActions uid={stock.name} onToggleChart={onToggleChart} isChartActive={isChartActive} />
        ) : (
          <div className="market-pricing-meta">
            <span className={`percent-delta ${stock.isDown ? "trend-down" : "trend-up"}`}>{stock.percent}</span>
            {stock.isDown ? <KeyboardArrowDown style={{ color: "#ff5722", fontSize: "16px" }} /> : <KeyboardArrowUp style={{ color: "#4caf50", fontSize: "16px" }} />}
            <span className="live-spot-price">{stock.price.toFixed(2)}</span>
          </div>
        )}
      </div>
    </li>
  );
};

const WatchListActions = ({ uid, onToggleChart, isChartActive }) => {
  const { openBuyWindow, openSellWindow, registerPriceAlert } = useContext(GeneralContext);

  return (
    <div className="action-buttons-overlay">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button type="button" className="action-pill buy-pill" onClick={(e) => { e.stopPropagation(); openBuyWindow(uid); }}>B</button>
      </Tooltip>
      
      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button type="button" className="action-pill sell-pill" onClick={(e) => { e.stopPropagation(); openSellWindow(uid); }}>S</button>
      </Tooltip>
      
      <Tooltip title="Technical Chart (A)" placement="top" arrow TransitionComponent={Grow}>
        <button type="button" className="action-pill technical-pill" style={{ backgroundColor: isChartActive ? "#ff5722" : "", color: isChartActive ? "#fff" : "" }} onClick={(e) => { e.stopPropagation(); onToggleChart(uid); }}>
          <BarChartOutlined style={{ fontSize: "14px" }} />
        </button>
      </Tooltip>
      
      <Tooltip title="Set Price Alert" placement="top" arrow TransitionComponent={Grow}>
        <button type="button" className="action-pill technical-pill" onClick={(e) => { e.stopPropagation(); const priceTarget = prompt(`Set threshold trigger value for ${uid} (₹):`); if(priceTarget && !isNaN(priceTarget)) { if(registerPriceAlert) registerPriceAlert(uid, priceTarget); alert(`Alert established for ₹${Number(priceTarget).toFixed(2)}.`); } }}>
          🔔
        </button>
      </Tooltip>
    </div>
  );
};

export default WatchList;