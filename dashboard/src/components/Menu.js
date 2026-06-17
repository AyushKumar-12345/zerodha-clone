import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "../../context/GeneralContext";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(0);

  // Consume current userSession parameters and reactive availableFunds from global context
  const { availableFunds } = useContext(GeneralContext);

  // FIX: Force data parsing queries to lock onto the immutable registration identifier
  const currentUsername = localStorage.getItem("username") || "Trader";
  const userInitials = currentUsername.slice(0, 2).toUpperCase();

  // Fetch and isolate the specific user's position counter length natively
  useEffect(() => {
    if (!isMenuOpen) return; // Only fetch data when dropdown opens

    const fetchDropdownMetrics = async () => {
      try {
        const response = await axios.get(`https://zerodha-clone-tbrh.onrender.com/allOrders?user=${currentUsername}`);
        setOrderCount(response.data ? response.data.length : 0);
      } catch (error) {
        console.error("Menu indicator sync warning:", error);
      }
    };
    fetchDropdownMetrics();
  }, [isMenuOpen, currentUsername]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Session ended. Securely logging out...");
    window.location.assign("https://zerodha-frontend-dmqe.onrender.com");
  };

  return (
    <div style={{ position: "relative", fontFamily: "'Inter', sans-serif" }}>
      {/* Profile Trigger Button */}
      <div 
        onClick={handleToggleMenu} 
        style={{ 
          width: "36px", 
          height: "36px", 
          borderRadius: "50%", 
          backgroundColor: "#fdeeed", 
          color: "#ff5722", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          fontSize: "13px", 
          fontWeight: "600", 
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        {userInitials}
      </div>

      {/* Profile Dropdown Drawer Overlay Menu */}
      {isMenuOpen && (
        <div 
          style={{ 
            position: "absolute", 
            top: "45px", 
            right: 0, 
            width: "240px", 
            backgroundColor: "#ffffff", 
            borderRadius: "4px", 
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)", 
            border: "1px solid #eeeeee", 
            zIndex: 3000,
            padding: "16px",
            boxSizing: "border-box"
          }}
        >
          {/* User Identity Info Segment */}
          <div style={{ paddingBottom: "12px", borderBottom: "1px solid #f9f9f9", marginBottom: "12px" }}>
            <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "600", color: "#444444" }}>
              {currentUsername}
            </h4>
            <span style={{ fontSize: "11px", color: "#999999" }}>{currentUsername.toLowerCase()}@kite.terminal</span>
          </div>

          {/* Metric Metadata Grid */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "11px" }}>
            <div>
              <span style={{ display: "block", color: "#999999", textTransform: "uppercase" }}>Available Funds</span>
              <span style={{ fontWeight: "600", color: "#4caf50", fontSize: "12px" }}>
                ₹{Number(availableFunds || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ display: "block", color: "#999999", textTransform: "uppercase" }}>Active Orders</span>
              <span style={{ fontWeight: "600", color: "#387ed1", fontSize: "12px" }}>
                {orderCount} Positions
              </span>
            </div>
          </div>

          {/* FIX: Removed the unstable upload profile picture and nickname feature elements */}

          {/* ACTIVE TERMINAL EXIT LINK */}
          <button 
            type="button"
            onClick={handleLogout}
            style={{ 
              width: "100%", 
              padding: "8px 0", 
              backgroundColor: "transparent", 
              color: "#ff5722", 
              border: "none", 
              borderRadius: "2px", 
              fontSize: "13px", 
              fontWeight: "600", 
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Log Out of Session
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;