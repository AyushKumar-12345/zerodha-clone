import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "../context/GeneralContext";

const Positions = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { adjustWalletBalance } = useContext(GeneralContext);

  // FIX: Force data tracking exclusively to the immutable account identifier
  const activeUser = localStorage.getItem("username") || "Trader";

  const livePrices = { INFY: 1555.45, ONGC: 116.80, TCS: 3194.80, KPITTECH: 266.45, QUICKHEAL: 308.55, WIPRO: 577.75 };

  const fetchPositions = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/allOrders?user=${activeUser}`);
      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed loading positions data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
    const interval = setInterval(fetchPositions, 3000);
    return () => clearInterval(interval);
  }, [activeUser]);

  const positionsMap = {};
  orders.forEach((order) => {
    const sym = order.name;

    if (sym === "CASH DEPOSIT" || sym === "CASH WITHDRAWAL") {
      return;
    }

    if (order.user && order.user !== activeUser) {
      return;
    }

    const qty = Number(order.qty);
    const price = Number(order.price);

    if (!positionsMap[sym]) {
      positionsMap[sym] = { name: sym, netQty: 0, totalBuyQty: 0, totalBuyValue: 0, totalSellQty: 0, totalSellValue: 0 };
    }

    if (order.mode === "BUY") {
      positionsMap[sym].netQty += qty;
      positionsMap[sym].totalBuyQty += qty;
      positionsMap[sym].totalBuyValue += (qty * price);
    } else {
      positionsMap[sym].netQty -= qty;
      positionsMap[sym].totalSellQty += qty;
      positionsMap[sym].totalSellValue += (qty * price);
    }
  });

  const activePositionsArray = Object.values(positionsMap).filter(pos => pos.netQty !== 0);

  const handleSquareOff = async (position) => {
    const targetMode = position.netQty > 0 ? "SELL" : "BUY";
    const absoluteQty = Math.abs(position.netQty);
    
    const positionAvgPrice = position.totalBuyQty > 0 ? (position.totalBuyValue / position.totalBuyQty) : 0;
    const squareOffMarketPrice = livePrices[position.name] || positionAvgPrice || 100;

    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: position.name,
        qty: absoluteQty,
        price: squareOffMarketPrice,
        mode: targetMode,
        product: "CNC",
        user: activeUser 
      });

      const transactionValue = absoluteQty * squareOffMarketPrice;
      if (adjustWalletBalance) {
        if (targetMode === "SELL") {
          adjustWalletBalance(transactionValue, "ADD");
        } else {
          adjustWalletBalance(transactionValue, "SUBTRACT");
        }
      }

      alert(`Successfully Executed Market Square Off for ${position.name}! Filled ${absoluteQty} shares at ₹${squareOffMarketPrice.toFixed(2)}.`);
      fetchPositions(); 
    } catch (error) {
      alert("Critical validation fault rejecting square off transaction.");
    }
  };

  if (loading) return <div style={{ padding: "30px", color: "#999" }}>Synchronizing active trade books...</div>;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: "100%" }}>
      <div style={{ paddingBottom: "15px", borderBottom: "1px solid #eeeeee", marginBottom: "25px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "500", color: "#444444" }}>
          Active Day Trading Positions ({activePositionsArray.length})
        </h3>
      </div>

      {activePositionsArray.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", color: "#999", fontSize: "14px" }}>
          No active intra-day exposures logged inside your account today.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eeeeee", color: "#999999" }}>
              <th style={{ padding: "12px 8px" }}>Instrument</th>
              <th style={{ padding: "12px 8px", textAlign: "right" }}>Net Qty.</th>
              <th style={{ padding: "12px 8px", textAlign: "right" }}>LTP</th>
              <th style={{ padding: "12px 8px", textAlign: "right" }}>Unrealized P&L</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>Actions Portal</th>
            </tr>
          </thead>
          <tbody>
            {activePositionsArray.map((pos) => {
              const positionAvgBuyPrice = pos.totalBuyQty > 0 ? (pos.totalBuyValue / pos.totalBuyQty) : 0;
              const currentPrice = livePrices[pos.name] || positionAvgBuyPrice || 100;
              let unrealizedPnL = 0;

              // FIX: Enforced zero-division safety blocks for active exposures 
              if (pos.netQty > 0) {
                const avgBuyPrice = pos.totalBuyQty > 0 ? (pos.totalBuyValue / pos.totalBuyQty) : currentPrice;
                unrealizedPnL = pos.netQty * (currentPrice - avgBuyPrice);
              } else {
                const avgSellPrice = pos.totalSellQty > 0 ? (pos.totalSellValue / pos.totalSellQty) : currentPrice;
                unrealizedPnL = Math.abs(pos.netQty) * (avgSellPrice - currentPrice);
              }

              const isProfit = unrealizedPnL >= 0;

              return (
                <tr key={pos.name} style={{ borderBottom: "1px solid #f9f9f9" }}>
                  <td style={{ padding: "14px 8px", fontWeight: "500" }}>{pos.name}</td>
                  <td style={{ padding: "14px 8px", textAlign: "right", fontWeight: "500", color: pos.netQty > 0 ? "#387ed1" : "#ff5722" }}>
                    {pos.netQty > 0 ? `+${pos.netQty}` : pos.netQty}
                  </td>
                  <td style={{ padding: "14px 8px", textAlign: "right" }}>₹{currentPrice.toFixed(2)}</td>
                  <td style={{ padding: "14px 8px", textAlign: "right", fontWeight: "600", color: isProfit ? "#4caf50" : "#ff5722" }}>
                    {isProfit ? "+" : ""}₹{unrealizedPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: "14px 8px", textAlign: "center" }}>
                    <button 
                      onClick={() => handleSquareOff(pos)}
                      style={{ padding: "4px 12px", backgroundColor: "#fff0ec", color: "#ff5722", border: "1px solid #ffbbab", borderRadius: "3px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}
                    >
                      Square Off / Exit
                    </button>
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

export default Positions;