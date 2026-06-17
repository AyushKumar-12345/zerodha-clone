import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "../context/GeneralContext";

const Funds = () => {
  const { availableFunds, adjustWalletBalance } = useContext(GeneralContext);

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const activeUser = localStorage.getItem("username") || "Trader";

  const handleDeposit = async (e) => {
    e.preventDefault();

    const amt = parseFloat(depositAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      await axios.post("https://://zerodha-clone-tbrh.onrender.com/newOrder", {
        name: "CASH DEPOSIT",
        qty: 1,
        price: amt,
        mode: "SELL",
        user: activeUser,
      });

      if (adjustWalletBalance) {
        adjustWalletBalance(amt, "ADD");
      }

      alert(`Successfully credited ₹${amt.toFixed(2)} to your account.`);
      setDepositAmount("");
    } catch (err) {
      console.error("Failed to commit mock cash deposit transaction:", err);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const amt = parseFloat(withdrawAmount);

    if (isNaN(amt) || amt <= 0) return;

    if (amt > availableFunds) {
      alert("Insufficient account capital balances.");
      return;
    }

    try {
      await axios.post("https://://zerodha-clone-tbrh.onrender.com/newOrder", {
        name: "CASH WITHDRAWAL",
        qty: 1,
        price: amt,
        mode: "BUY",
        user: activeUser,
      });

      if (adjustWalletBalance) {
        adjustWalletBalance(amt, "SUBTRACT");
      }

      alert(`Withdrawal processed for ₹${amt.toFixed(2)}.`);
      setWithdrawAmount("");
    } catch (err) {
      console.error("Failed to commit mock cash withdrawal transaction:", err);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          paddingBottom: "15px",
          borderBottom: "1px solid #eeeeee",
          marginBottom: "25px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "500",
            color: "#444444",
          }}
        >
          Funds Management Console
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            backgroundColor: "#fbfbfb",
            padding: "24px",
            borderRadius: "4px",
            border: "1px solid #eeeeee",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "#999999",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Available Equity Margin
          </span>

          <h1
            style={{
              margin: "10px 0 25px 0",
              color: "#4caf50",
              fontWeight: "300",
              fontSize: "36px",
            }}
          >
            ₹
            {(availableFunds || 0).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h1>

          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "15px",
              fontSize: "13px",
              color: "#666",
            }}
          >
            Available funds ready for trading and withdrawals.
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "320px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <form
            onSubmit={handleDeposit}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              border: "1px solid #eee",
              padding: "16px",
              borderRadius: "4px",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#666",
                  marginBottom: "4px",
                }}
              >
                Deposit Mock Funds (INR)
              </label>

              <input
                type="number"
                placeholder="Enter amount eg: 10000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "13px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "9px 20px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                marginTop: "18px",
              }}
            >
              Add Capital
            </button>
          </form>

          <form
            onSubmit={handleWithdraw}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              border: "1px solid #eee",
              padding: "16px",
              borderRadius: "4px",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#666",
                  marginBottom: "4px",
                }}
              >
                Withdraw Mock Funds (INR)
              </label>

              <input
                type="number"
                placeholder="Enter amount eg: 5000"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "13px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "9px 20px",
                backgroundColor: "#ff5722",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                marginTop: "18px",
              }}
            >
              Withdraw
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Funds;