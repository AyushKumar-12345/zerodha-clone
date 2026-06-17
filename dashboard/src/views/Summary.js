import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "../context/GeneralContext";

const Summary = () => {
  // Consume BOTH availableFunds AND the reactive userSession from global context
  const { availableFunds, userSession } = useContext(GeneralContext);
  const [dbOrders, setDbOrders] = useState([]);

  // FIX: Anchor the active user explicitly to context state to stay reactive 
  // and completely bypass raw localStorage race conditions on initial mount.
  const activeUser = userSession?.username || localStorage.getItem("username") || "Trader";

  useEffect(() => {
    // Avoid running backend requests for a generic fallback placeholder identity
    if (!activeUser || activeUser === "Trader") return;

    const fetchSummaryData = async () => {
      try {
        const response = await axios.get(`http://https://zerodha-clone-tbrh.onrender.com/allOrders?user=${activeUser}`);
        setDbOrders(response.data || []);
      } catch (err) {
        console.error("Dashboard overview data stream sync error:", err);
      }
    };
    
    fetchSummaryData();
    const interval = setInterval(fetchSummaryData, 3000);
    return () => clearInterval(interval);
  }, [activeUser]); // Triggers an un-delayed data query execution step the moment activeUser switches!

  const livePrices = { 
    INFY: 1555.45, 
    ONGC: 116.80, 
    TCS: 3194.80, 
    KPITTECH: 266.45, 
    QUICKHEAL: 308.55, 
    WIPRO: 577.75 
  };

  // Portfolio Parsing Engine bound to authenticated session user
  const holdingsSummary = {};
  dbOrders.forEach((order) => {
    const ticker = order.name;

    if (ticker === "CASH DEPOSIT" || ticker === "CASH WITHDRAWAL") {
      return;
    }

    if (order.user && order.user !== activeUser) {
      return;
    }

    const qty = Number(order.qty);
    const price = Number(order.price);

    if (!holdingsSummary[ticker]) {
      holdingsSummary[ticker] = { qty: 0, totalCost: 0 };
    }

    if (order.mode === "BUY") {
      holdingsSummary[ticker].qty += qty;
      holdingsSummary[ticker].totalCost += (qty * price);
    } else if (order.mode === "SELL") {
      const currentAvgCostBasis = holdingsSummary[ticker].qty > 0 ? (holdingsSummary[ticker].totalCost / holdingsSummary[ticker].qty) : price;
      holdingsSummary[ticker].qty -= qty;
      holdingsSummary[ticker].totalCost -= (qty * currentAvgCostBasis);

      if (holdingsSummary[ticker].qty <= 0) {
        delete holdingsSummary[ticker];
      }
    }
  });

  const processedHoldings = Object.keys(holdingsSummary).map(ticker => {
    const item = holdingsSummary[ticker];
    const fallbackPrice = item.qty > 0 ? (item.totalCost / item.qty) : 0;
    const currentPrice = livePrices[ticker] || fallbackPrice;
    return {
      totalCost: item.totalCost,
      currentValue: item.qty * currentPrice
    };
  });

  // Mathematical Calculations Core
  const totalInvestment = processedHoldings.reduce((acc, curr) => acc + Number(curr.totalCost), 0);
  const totalCurrentValue = processedHoldings.reduce((acc, curr) => acc + Number(curr.currentValue), 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const computedMarginsUsed = totalInvestment;

  // Formatting helper for k-notation abbreviations (e.g., 3.74k)
  const formatK = (num) => {
    const numeric = Number(num || 0);
    return numeric >= 1000 ? `${(numeric / 1000).toFixed(2)}k` : numeric.toFixed(2);
  };

  const themeColor = totalPnL >= 0 ? "#4caf50" : "#ff5722";

  return (
    <div style={{ padding: "10px 0", fontFamily: "'Inter', sans-serif", width: "100%" }}>
      
      {/* IDENTITY DISPLAY ROW */}
      <div style={{ paddingBottom: "20px", marginBottom: "30px" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "400", color: "#444444" }}>
          Hi, {activeUser}!
        </h1>
      </div>

      {/* DYNAMIC METRICS PLATFORM MATRIX */}
      <div style={{ display: "flex", gap: "40px", width: "100%", flexWrap: "wrap" }}>
        
        {/* Left Component Card: Funds & Margin Status Ledger */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "14px", fontWeight: "500", color: "#444444" }}>Equity</h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <span style={{ fontSize: "32px", fontWeight: "300", color: "#444444" }}>
              ₹{formatK(availableFunds || 0)}
            </span>
            <span style={{ fontSize: "12px", color: "#999999" }}>Margin available</span>
          </div>
          <div style={{ borderTop: "1px solid #eeeeee", marginTop: "20px", paddingTop: "15px", display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666666" }}>
            <span>Margins used</span>
            <span style={{ fontWeight: "600", color: computedMarginsUsed > 0 ? "#ff5722" : "#444444" }}>
              ₹{formatK(Math.max(0, computedMarginsUsed))}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666666", marginTop: "10px" }}>
            <span>Total Cash Pool</span>
            <span style={{ fontWeight: "600", color: "#4caf50" }}>₹{formatK((availableFunds || 0) + Math.max(0, computedMarginsUsed))}</span>
          </div>
        </div>

        {/* Right Component Card: Current Portfolio Valuation Statistics */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "14px", fontWeight: "500", color: "#444444" }}>
            Holdings ({processedHoldings.length})
          </h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <span style={{ fontSize: "32px", fontWeight: "300", color: themeColor }}>
              ₹{formatK(totalCurrentValue)}
            </span>
            <span style={{ fontSize: "13px", color: themeColor, fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
              {totalPnL >= 0 ? "▲ +" : "▼ "}{totalPnLPercent.toFixed(2)}%
            </span>
          </div>
          <div style={{ borderTop: "1px solid #eeeeee", marginTop: "20px", paddingTop: "15px", display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666666" }}>
            <span>Current Value</span>
            <span style={{ fontWeight: "600", color: "#444444" }}>₹{formatK(totalCurrentValue)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666666", marginTop: "10px" }}>
            <span>Investment Cost</span>
            <span style={{ fontWeight: "600", color: "#444444" }}>₹{formatK(totalInvestment)}</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Summary;