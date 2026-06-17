import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Global style injection sheet handling structural pane alignments
import "./index.css";

// 1. Directing the index architecture channel away from Home and into Dashboard
import Dashboard from "./views/Dashboard/Dashboard";

const AppRoot = () => {
  // Extract user session signatures dynamically
  // If a user logs out and logs in as a fresh name profile, the root level detects it
  const activeUserKey = localStorage.getItem("username") || "guest-session";

  return (
    <Routes>
      {/* Master Catch-All Route:
        We pass the dynamic key here to ensure that if a different user logs in,
        the entire client node tree resets cleanly, executing all initialization effects.
      */}
      <Route path="/*" element={<Dashboard key={activeUserKey} />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Explicitly passing v7 transition flags handles clean history routing flags smoothly */}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoot />
    </BrowserRouter>
  </React.StrictMode>
);