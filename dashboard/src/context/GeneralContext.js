import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false); 
  const [selectedStockUID, setSelectedStockUID] = useState("");
  
  const getActiveUsername = () => {
    return localStorage.getItem("username") || "Trader";
  };

  const getInitialSession = (user) => {
    const currentTrader = user || getActiveUsername();
    return {
      username: currentTrader,
      email: `${currentTrader.toLowerCase()}@kite.terminal`
    };
  };

  const [userSession, setUserSession] = useState(() => getInitialSession());
  const [availableFunds, setAvailableFunds] = useState(50000.00);
  const [priceAlerts, setPriceAlerts] = useState([]);

  // New calculation loop: cross-checks storage settings against live database orders
  const computeLiveBalances = useCallback(async (username) => {
    if (!username || username === "Trader") return;

    try {
      // 1. Fetch all orders tied to this authenticated profile handle
      const response = await axios.get(`http://https://zerodha-clone-tbrh.onrender.com/allOrders?user=${username}`);
      const orders = response.data || [];

      // 2. Map through ledger mutations to get exact spent capital
      let spentCapital = 0;
      let cashDeposits = 0;
      let cashWithdrawals = 0;

      orders.forEach((order) => {
        if (order.name === "CASH DEPOSIT") {
          cashDeposits += Number(order.price || 0);
        } else if (order.name === "CASH WITHDRAWAL") {
          cashWithdrawals += Number(order.price || 0);
        } else {
          // Standard stock allocations
          const transactionCost = Number(order.qty || 0) * Number(order.price || 0);
          if (order.mode === "BUY") {
            spentCapital += transactionCost;
          } else if (order.mode === "SELL") {
            spentCapital -= transactionCost;
          }
        }
      });

      // 3. Base Starting Capital Profile Logic (₹50,000.00 base + deposits - withdrawals - spent)
      const baseStartingFunds = 50000.00;
      const netCalculatedFunds = baseStartingFunds + cashDeposits - cashWithdrawals - spentCapital;

      // Save custom ledger namespace array cleanly
      localStorage.setItem(`userFunds_${username}`, netCalculatedFunds.toString());
      setAvailableFunds(netCalculatedFunds);
    } catch (err) {
      console.error("Context wallet synchronization lookup breakdown:", err);
      // Failover safely to fallback cache storage array structures
      const userIsolatedFunds = localStorage.getItem(`userFunds_${username}`);
      setAvailableFunds(userIsolatedFunds ? Number(userIsolatedFunds) : 50000.00);
    }
  }, []);

  const syncSession = useCallback(() => {
    const freshUser = localStorage.getItem("username") || "Trader";
    setUserSession({
      username: freshUser,
      email: `${freshUser.toLowerCase()}@kite.terminal`
    });
    
    const isolatedAlerts = localStorage.getItem(`priceAlerts_${freshUser}`);
    setPriceAlerts(isolatedAlerts ? JSON.parse(isolatedAlerts) : []);

    // Recalculate everything live based on Peter's transaction blocks!
    computeLiveBalances(freshUser);
  }, [computeLiveBalances]);

  useEffect(() => {
    window.addEventListener("storage", syncSession);
    window.addEventListener("localLoginSync", syncSession);
    
    syncSession();

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("localLoginSync", syncSession);
    };
  }, [syncSession]);

  useEffect(() => {
    if (userSession.username) {
      localStorage.setItem(`priceAlerts_${userSession.username}`, JSON.stringify(priceAlerts));
    }
  }, [priceAlerts, userSession.username]);

  const adjustWalletBalance = (amount, operationalMode = "ADD") => {
    const numericAmount = Number(amount || 0);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    if (operationalMode === "ADD") {
      setAvailableFunds(prev => {
        const nextFunds = prev + numericAmount;
        localStorage.setItem(`userFunds_${userSession.username}`, nextFunds.toString());
        return nextFunds;
      });
    } else if (operationalMode === "SUBTRACT") {
      setAvailableFunds(prev => {
        const nextFunds = Math.max(0, prev - numericAmount);
        localStorage.setItem(`userFunds_${userSession.username}`, nextFunds.toString());
        return nextFunds;
      });
    }
  };

  const registerPriceAlert = (ticker, targetPrice) => {
    const newAlert = { id: Date.now(), ticker, targetPrice: Number(targetPrice), active: true };
    setPriceAlerts(prev => [...prev, newAlert]);
  };

  const removePriceAlert = (id) => {
    setPriceAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const openBuyWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
    setIsSellWindowOpen(false); 
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
  };

  const openSellWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false); 
  };

  const closeSellWindow = () => {
    setIsSellWindowOpen(false);
  };

  return (
    <GeneralContext.Provider
      value={{
        isBuyWindowOpen,
        isSellWindowOpen,    
        selectedStockUID,
        openBuyWindow,
        closeBuyWindow,
        openSellWindow,   
        closeSellWindow,
        userSession,       
        availableFunds,          
        adjustWalletBalance,     
        priceAlerts,             
        registerPriceAlert,      
        removePriceAlert
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;