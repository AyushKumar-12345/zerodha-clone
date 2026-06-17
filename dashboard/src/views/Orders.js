import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIX: Force registration tracking tightly to the permanent system username string
  const activeUser = localStorage.getItem("username") || "Trader";

  // Automatically request orders from your backend database
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://https://zerodha-clone-tbrh.onrender.com/allOrders?user=${activeUser}`);
        setOrders(response.data || []);
      } catch (error) {
        console.error("Failed to load database logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [activeUser]);

  // Filter records to isolate only rows created by this specific profile
  const userFilteredOrders = orders.filter((order) => {
    return !order.user || order.user === activeUser;
  });

  if (loading) {
    return (
      <div style={{ padding: "40px", fontFamily: "'Inter', sans-serif", color: "#999" }}>
        Fetching live order database metrics...
      </div>
    );
  }

  if (userFilteredOrders.length === 0) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        fontFamily: "'Inter', sans-serif"
      }}>
        <p style={{ color: "#999999", fontSize: "14px", margin: 0, fontWeight: "400" }}>
          You haven't placed any orders today.
        </p>
      </div>
    );
  }

  const sortedOrders = [...userFilteredOrders].reverse();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: "100%", boxSizing: "border-box" }}>
      
      {/* Header Segment */}
      <div style={{ paddingBottom: "15px", borderBottom: "1px solid #eeeeee", marginBottom: "25px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "500", color: "#444444" }}>
          Orders ({userFilteredOrders.length})
        </h3>
      </div>

      {/* Live Data Rendering Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eeeeee", color: "#999999" }}>
            <th style={{ padding: "12px 8px", fontWeight: "400" }}>Time</th>
            <th style={{ padding: "12px 8px", fontWeight: "400" }}>Type</th>
            <th style={{ padding: "12px 8px", fontWeight: "400" }}>Instrument</th>
            <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>Product</th>
            <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>Qty.</th>
            <th style={{ padding: "12px 8px", fontWeight: "400", textAlign: "right" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => {
            let displayMode = order.mode || "BUY";
            let useDepositStyle = false;

            // FIX: Set intuitive labeling styling flags for funds ledger movements
            if (order.name === "CASH DEPOSIT") {
              displayMode = "DEPOSIT";
              useDepositStyle = true;
            } else if (order.name === "CASH WITHDRAWAL") {
              displayMode = "WITHDRAW";
            }

            const isBuyOrDeposit = displayMode === "BUY" || useDepositStyle;
            const elementUniqueKey = order._id || `${order.name}-${order.price}-${order.qty}-${Math.random()}`;

            return (
              <tr key={elementUniqueKey} style={{ borderBottom: "1px solid #f9f9f9" }}>
                <td style={{ padding: "14px 8px", color: "#999999" }}>Today</td>
                <td style={{ padding: "14px 8px" }}>
                  <span style={{
                    backgroundColor: isBuyOrDeposit ? "rgba(76, 175, 80, 0.1)" : "rgba(255, 87, 34, 0.1)",
                    color: isBuyOrDeposit ? "#4caf50" : "#ff5722",
                    padding: "3px 8px",
                    borderRadius: "2px",
                    fontSize: "10px",
                    fontWeight: "600"
                  }}>
                    {displayMode}
                  </span>
                </td>
                <td style={{ padding: "14px 8px", fontWeight: "500", color: "#444444" }}>{order.name}</td>
                <td style={{ padding: "14px 8px", textAlign: "right", color: "#666666" }}>CNC</td>
                <td style={{ padding: "14px 8px", textAlign: "right", color: "#444444" }}>{order.qty}</td>
                <td style={{ padding: "14px 8px", textAlign: "right", fontWeight: "500", color: "#222222" }}>
                  ₹{Number(order.price).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;