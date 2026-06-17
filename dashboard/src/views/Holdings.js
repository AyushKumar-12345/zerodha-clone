import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "../components/VerticalGraph"; 

const Holdings = () => {
  const [dbOrders, setDbOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIX: Force registration tracking tightly to the permanent system username string
  const activeUser = localStorage.getItem("username") || "Trader";

  // Fetch real orders matching the active user from your database on page load
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`http://https://zerodha-clone-tbrh.onrender.com/allOrders?user=${activeUser}`);
        setDbOrders(response.data || []);
      } catch (error) {
        console.error("Error loading portfolio metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, [activeUser]); 

  // Mock Market Prices dictionary to compare with order fill rates
  const liveMarketPrices = {
    INFY: 1555.45,
    ONGC: 116.80,
    TCS: 3194.80,
    KPITTECH: 266.45,
    QUICKHEAL: 308.55,
    WIPRO: 577.75,
  };

  // Process database logs into actual balance holding metrics filtered by active profile
  const holdingsSummary = {};
  dbOrders.forEach((order) => {
    const ticker = order.name || "INFY";

    // Clear system cash ledger rows from being treated as stocks
    if (ticker === "CASH DEPOSIT" || ticker === "CASH WITHDRAWAL") {
      return; 
    }

    // Secondary frontend verification safety check
    if (order.user && order.user !== activeUser) {
      return;
    }

    const qty = Number(order.qty || 0);
    const orderPrice = Number(order.price || 0);

    if (!holdingsSummary[ticker]) {
      holdingsSummary[ticker] = { name: ticker, qty: 0, totalCost: 0 };
    }

    if (order.mode === "BUY") {
      holdingsSummary[ticker].qty += qty;
      holdingsSummary[ticker].totalCost += (qty * orderPrice);
    } else if (order.mode === "SELL") {
      // FIX: Proportionally scale down remaining totalCost before altering item quantities
      const currentAvgCost = holdingsSummary[ticker].qty > 0 ? (holdingsSummary[ticker].totalCost / holdingsSummary[ticker].qty) : orderPrice;
      holdingsSummary[ticker].qty -= qty;
      holdingsSummary[ticker].totalCost -= (qty * currentAvgCost);

      if (holdingsSummary[ticker].qty <= 0) {
        delete holdingsSummary[ticker];
      }
    }
  });

  const processedHoldingsArray = Object.values(holdingsSummary).map(item => {
    const avgPrice = item.qty > 0 ? (item.totalCost / item.qty) : 0;
    const currentPrice = liveMarketPrices[item.name] || avgPrice;
    const currentValue = item.qty * currentPrice;
    const netProfitLoss = currentValue - item.totalCost;
    const percentageDelta = item.totalCost > 0 ? ((netProfitLoss / item.totalCost) * 100) : 0;

    return {
      ...item,
      avgPrice,
      currentPrice,
      currentValue,
      netProfitLoss,
      percentageDelta
    };
  });

  // Calculate totals for top summary profile metrics cards
  const totalInvestment = processedHoldingsArray.reduce((acc, curr) => acc + curr.totalCost, 0);
  const totalCurrentValue = processedHoldingsArray.reduce((acc, curr) => acc + curr.currentValue, 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  if (loading) {
    return <div style={{ padding: "30px", fontFamily: "'Inter', sans-serif", color: "#999" }}>Synchronizing portfolio balances...</div>;
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: "100%", boxSizing: "border-box" }}>
      
      {/* HEADER BANNER TITLE */}
      <div style={{ paddingBottom: "15px", borderBottom: "1px solid #eeeeee", marginBottom: "25px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "500", color: "#444444" }}>
          Holdings ({processedHoldingsArray.length})
        </h3>
      </div>

      {/* PORTFOLIO SNAPSHOT METRIC BLOCKS */}
      <div style={{ display: "flex", gap: "30px", marginBottom: "35px", flexWrap: "wrap" }}>
        <div style={{ flex: "1", minWidth: "160px" }}>
          <span style={{ fontSize: "11px", color: "#999999", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Investment</span>
          <h2 style={{ margin: "5px 0 0 0", fontWeight: "400", color: "#444444" }}>₹{totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
        </div>
        <div style={{ flex: "1", minWidth: "160px" }}>
          <span style={{ fontSize: "11px", color: "#999999", textTransform: "uppercase", letterSpacing: "0.5px" }}>Current Value</span>
          <h2 style={{ margin: "5px 0 0 0", fontWeight: "400", color: "#444444" }}>₹{totalCurrentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
        </div>
        <div style={{ flex: "1", minWidth: "160px" }}>
          <span style={{ fontSize: "11px", color: "#999999", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total P&L</span>
          <h2 style={{ 
            margin: "5px 0 0 0", 
            fontWeight: "500", 
            color: totalPnL >= 0 ? "#4caf50" : "#ff5722" 
          }}>
            {totalPnL >= 0 ? "+" : ""}₹{totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })} 
            <span style={{ fontSize: "12px", marginLeft: "6px", fontWeight: "400" }}>
              ({totalPnLPercent.toFixed(2)}%)
            </span>
          </h2>
        </div>
      </div>

      {/* IF PORTFOLIO IS EMPTY */}
      {processedHoldingsArray.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", color: "#999", fontSize: "14px" }}>
          No open holdings. Purchase assets via your watchlist to initiate portfolio calculations!
        </div>
      ) : (
        /* PORTFOLIO BALANCES ACCOUNT TABLE DATA SCREEN */
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eeeeee", color: "#999999" }}>
              <th style={{ padding: "12px 8px", fontWeight: "400" }}>Instrument</th>
              <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>Qty.</th>
              <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>Avg. Cost</th>
              <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>LTP</th>
              <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>Cur. Value</th>
              <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>P&L</th>
              <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>Net Chg.</th>
            </tr>
          </thead>
          <tbody>
            {processedHoldingsArray.map((stock) => {
              const isProfit = stock.netProfitLoss >= 0;
              return (
                <tr key={stock.name} style={{ borderBottom: "1px solid #f9f9f9", transition: "background 0.15s" }} className="table-holding-row">
                  <td style={{ padding: "14px 8px", fontWeight: "500", color: "#444444" }}>{stock.name}</td>
                  <td style={{ padding: "14px 8px", textAlign: "right", color: "#666666" }}>{stock.qty}</td>
                  <td style={{ padding: "14px 8px", textAlign: "right", color: "#444444" }}>₹{stock.avgPrice.toFixed(2)}</td>
                  <td style={{ padding: "14px 8px", textAlign: "right", color: "#444444" }}>₹{stock.currentPrice.toFixed(2)}</td>
                  <td style={{ padding: "14px 8px", textAlign: "right", fontWeight: "500" }}>₹{stock.currentValue.toFixed(2)}</td>
                  <td style={{ padding: "14px 8px", textAlign: "right", fontWeight: "500", color: isProfit ? "#4caf50" : "#ff5722" }}>
                    {isProfit ? "+" : ""}{stock.netProfitLoss.toFixed(2)}
                  </td>
                  <td style={{ padding: "14px 8px", textAlign: "right", fontWeight: "500", color: isProfit ? "#4caf50" : "#ff5722" }}>
                    {isProfit ? "+" : ""}{stock.percentageDelta.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Holdings;