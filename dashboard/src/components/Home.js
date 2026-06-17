import React from "react";
// Correctly import the Dashboard wrapper from its new directory location
import Dashboard from "../views/Dashboard/Dashboard";

const Home = () => {
  return (
    <div
      className="home-root"
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <Dashboard />
    </div>
  );
};

export default Home;