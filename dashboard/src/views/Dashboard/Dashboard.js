import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "../Apps";
import Funds from "../Funds";
import Holdings from "../Holdings";
import Orders from "../Orders";
import Positions from "../Positions";
import Summary from "../Summary";
import WatchList from "../WatchList/WatchList";

import TopBar from "../../components/TopBar";
import OrderActionWindow from "../OrderWindow/OrderActionWindow";
import GeneralContext, { GeneralContextProvider } from "../../context/GeneralContext";
import "./Dashboard.css";

const DashboardContent = () => {
  const { 
    isBuyWindowOpen, 
    isSellWindowOpen, 
    selectedStockUID 
  } = useContext(GeneralContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // 1. Intercept inbound cross-origin query parameters from the login redirect
    const urlParams = new URLSearchParams(window.location.search);
    const inboundUser = urlParams.get("loginUser");

    if (inboundUser) {
      localStorage.setItem("username", inboundUser.trim());
      localStorage.setItem("token", "mock-presentation-session-token");
      
      // FIX: Dispatch the custom state notification sync event right away 
      // so GeneralContext overrides its initialization and matches balances immediately!
      window.dispatchEvent(new CustomEvent("localLoginSync"));
      
      // Clean up the URL address bar cleanly for a production-ready look
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // 2. Run fallback logic only if no explicit parameter was sent
      let token = localStorage.getItem("token");
      let storedUser = localStorage.getItem("username");
      
      if (!token || !storedUser) {
        localStorage.setItem("token", "mock-presentation-session-token");
        if (!localStorage.getItem("username")) {
          localStorage.setItem("username", "tony12345");
        }
      }
    }

    setIsAuthenticated(true);
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", padding: "40px", color: "#999" }}>
        Validating secure terminal session parameters...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100vh", width: "100vw", fontFamily: "'Inter', sans-serif", backgroundColor: "#ffffff",
        position: "fixed", top: 0, left: 0, zIndex: 9999
      }}>
        <div style={{ textAlign: "center", maxWidth: "420px", padding: "24px" }}>
          <h2 style={{ color: "#444444", marginBottom: "12px", fontWeight: "500" }}>Session Expired</h2>
          <button 
            onClick={() => window.location.assign("http://localhost:3000/login")}
            style={{ padding: "10px 24px", backgroundColor: "#387ed1", color: "#ffffff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Go to Login Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <TopBar />
      <div className="dashboard-container">
        <aside className="sidebar-pane">
          <WatchList />
        </aside>
        <main className="content-pane">
          <div className="inner-view-limiter">
            <Routes>
              <Route exact path="/" element={<Summary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/apps" element={<Apps />} />
            </Routes>
          </div>
        </main>
      </div>

      {isBuyWindowOpen && <OrderActionWindow uid={selectedStockUID} mode="BUY" />}
      {isSellWindowOpen && <OrderActionWindow uid={selectedStockUID} mode="SELL" />}
    </div>
  );
};

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <DashboardContent />
    </GeneralContextProvider>
  );
};

export default Dashboard;