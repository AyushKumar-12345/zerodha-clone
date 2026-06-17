import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "../../context/GeneralContext"; 

const OrderActionWindow = ({ uid, mode = "BUY" }) => {
  // Consume context variables securely
  const { closeBuyWindow, closeSellWindow, adjustWalletBalance, availableFunds } = useContext(GeneralContext);
  const isBuyMode = mode === "BUY";

  // FIX: Anchor identity extraction completely to the immutable local storage account handle
  const activeUser = localStorage.getItem("username") || "Trader";

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    setStockQuantity(val === "" ? "" : Math.max(0, parseInt(val, 10)));
  };

  const handlePriceChange = (e) => {
    const val = e.target.value;
    setStockPrice(val === "" ? "" : Math.max(0, parseFloat(val)));
  };

  const handleClose = () => {
    if (isBuyMode) {
      if (closeBuyWindow) closeBuyWindow();
    } else {
      if (closeSellWindow) closeSellWindow();
    }
  };

  const handleOrderSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const finalQty = stockQuantity === "" ? 0 : Number(stockQuantity);
    const finalPrice = stockPrice === "" ? 0 : Number(stockPrice);

    if (finalQty <= 0 || finalPrice <= 0) {
      alert("Please provide a valid price and quantity configuration.");
      return;
    }

    const transactionCost = finalQty * finalPrice;

    // Capital Validation Check for BUY Orders
    if (isBuyMode && transactionCost > (availableFunds || 50000)) {
      alert(`Insufficient funds! Your available balance is ₹${(availableFunds || 50000).toLocaleString('en-IN', { minimumFractionDigits: 2 })} but this order requires ₹${transactionCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}.`);
      return;
    }

    try {
      // Post clean payload directly to the transaction backend database including user identifier parameter
      await axios.post("https://zerodha-clone-tbrh.onrender.com/newOrder", {
        user: activeUser, 
        name: uid,
        qty: finalQty,
        price: finalPrice,
        mode: mode, 
        product: "CNC" 
      });

      // Adjust local context ledger if context state engine methods are present
      if (adjustWalletBalance) {
        if (isBuyMode) {
          adjustWalletBalance(transactionCost, "SUBTRACT");
        } else {
          adjustWalletBalance(transactionCost, "ADD");
        }
      }

      handleClose();
    } catch (error) {
      console.error("Order placement failed:", error);
      alert(`Failed to place ${mode.toLowerCase()} order. Please try again.`);
    }
  };

  const calculatedMargin = ((Number(stockQuantity) || 0) * (Number(stockPrice) || 0)).toFixed(2);
  const dynamicColor = isBuyMode ? "#387ed1" : "#ff5722";

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      fontFamily: "'Inter', -apple-system, sans-serif"
    }}>
      <form 
        onSubmit={handleOrderSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "4px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          overflow: "hidden"
        }}
      >
        {/* Banner header element */}
        <div style={{
          backgroundColor: dynamicColor,
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#ffffff"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "11px", fontWeight: "600", backgroundColor: "rgba(255,255,255,0.2)", padding: "2px 6px", borderRadius: "2px" }}>
              {mode}
            </span>
            <span style={{ fontSize: "16px", fontWeight: "500" }}>{uid}</span>
            <span style={{ fontSize: "11px", opacity: 0.8 }}>NSE</span>
          </div>
          <div style={{ display: "flex", gap: "8px", fontSize: "12px", fontWeight: "500" }}>
            <span style={{ background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: "2px" }}>CNC</span>
            <span style={{ opacity: 0.6, padding: "2px 8px" }}>MIS</span>
          </div>
        </div>

        {/* Core Quantity and Price Form Fields */}
        <div style={{ padding: "24px 20px", display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "12px", color: "#999999", marginBottom: "6px" }}>Qty.</label>
            <input
              type="number"
              min="1"
              required
              onChange={handleQuantityChange}
              value={stockQuantity}
              style={{ width: "100%", padding: "10px", border: "1px solid #eeeeee", borderRadius: "4px", boxSizing: "border-box", fontSize: "14px" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "12px", color: "#999999", marginBottom: "6px" }}>Price</label>
            <input
              type="number"
              step="0.05"
              min="0.05"
              required
              onChange={handlePriceChange}
              value={stockPrice}
              style={{ width: "100%", padding: "10px", border: "1px solid #eeeeee", borderRadius: "4px", boxSizing: "border-box", fontSize: "14px" }}
            />
          </div>
        </div>

        {/* Footer actions area */}
        <div style={{
          backgroundColor: "#fbfbfb",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #eeeeee"
        }}>
          <div>
            <span style={{ display: "block", fontSize: "11px", color: "#999999" }}>Margin required</span>
            <span style={{ fontSize: "15px", fontWeight: "600", color: "#444444" }}>₹{Number(calculatedMargin).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              type="submit" 
              disabled={!stockQuantity || !stockPrice || Number(stockQuantity) <= 0 || Number(stockPrice) <= 0}
              style={{
                padding: "10px 24px",
                backgroundColor: dynamicColor,
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                opacity: (!stockQuantity || !stockPrice || Number(stockQuantity) <= 0 || Number(stockPrice) <= 0) ? 0.5 : 1
              }}
            >
              {isBuyMode ? "Buy" : "Sell"}
            </button>
            <button 
              type="button" 
              onClick={handleClose}
              style={{
                padding: "10px 24px",
                backgroundColor: "#ffffff",
                color: "#666666",
                border: "1px solid #cccccc",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderActionWindow;