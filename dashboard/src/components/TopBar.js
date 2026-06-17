import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import GeneralContext from "../context/GeneralContext";
import "./TopBar.css"; 

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(0);

  const { userSession, availableFunds } = useContext(GeneralContext);

  // FIX: Anchor all username references safely to the permanent registration string
  const displayUsername = localStorage.getItem("username") || "Trader";
  const displayEmail = userSession?.email || `${displayUsername.toLowerCase()}@kite.terminal`;
  const userInitials = displayUsername.substring(0, 2).toUpperCase();
  const activeUser = displayUsername; 

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await axios.get(`http://https://zerodha-clone-tbrh.onrender.com/allOrders?user=${activeUser}`);
        setOrderCount(response.data ? response.data.length : 0);
      } catch (error) {
        console.error("Counter data fetching warning:", error);
      }
    };
    fetchOrderCount();
    const interval = setInterval(fetchOrderCount, 3000);
    return () => clearInterval(interval);
  }, [activeUser]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.assign("http://localhost:3000"); 
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="index-item">
          <span>NIFTY 50</span>
          <span className="down">23,456.70</span>
          <span className="percent">-0.42%</span>
        </div>
        <div className="index-item">
          <span>SENSEX</span>
          <span className="up">77,120.35</span>
          <span className="percent">+0.15%</span>
        </div>
      </div>

      <div className="menu-container">
        <div className="menus">
          <NavLink to="/" className={({ isActive }) => `menu-link-tab ${isActive ? "active" : ""}`}>
            Dashboard
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => `menu-link-tab ${isActive ? "active" : ""}`}>
            Orders
            {orderCount > 0 && <span className="badge-counter">{orderCount}</span>}
          </NavLink>
          <NavLink to="/holdings" className={({ isActive }) => `menu-link-tab ${isActive ? "active" : ""}`}>
            Holdings
          </NavLink>
          <NavLink to="/positions" className={({ isActive }) => `menu-link-tab ${isActive ? "active" : ""}`}>
            Positions
          </NavLink>
          <NavLink to="/funds" className={({ isActive }) => `menu-link-tab ${isActive ? "active" : ""}`}>
            Funds
          </NavLink>
          <NavLink to="/apps" className={({ isActive }) => `menu-link-tab ${isActive ? "active" : ""}`}>
            Apps
          </NavLink>
        </div>
        
        <div 
          className={`topbar-profile-anchor ${dropdownOpen ? "active" : ""}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {/* Default back cleanly to initials badge to prevent storage crashes */}
          <div className="avatar">{userInitials}</div>
          <span className="username">{displayUsername}</span>

          {dropdownOpen && (
            <div className="profile-dropdown-portal" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-header-banner" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="avatar" style={{ width: "40px", height: "40px", fontSize: "14px" }}>{userInitials}</div>
                <div>
                  <span className="user-fullname">{displayUsername}</span>
                  <span className="user-email">{displayEmail}</span>
                </div>
              </div>

              <div className="dropdown-metrics-row">
                <div className="metric-block">
                  <span>Available Funds</span>
                  <span className="value-equity">₹{Number(availableFunds || 50000).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="metric-block" style={{ textAlign: "right" }}>
                  <span>Active Orders</span>
                  <span className="value-orders">{orderCount} Positions</span>
                </div>
              </div>

              {/* FIX: Removed the buggy file inputs and nickname edit handlers completely */}
              <div className="dropdown-action-list-links">
                <div onClick={handleLogout} className="dropdown-logout-trigger" style={{ cursor: "pointer", marginTop: "5px" }}>
                  Log Out of Session
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;