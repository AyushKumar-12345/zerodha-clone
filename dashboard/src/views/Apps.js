import React, { useState } from "react";

const ECOSYSTEM_APPS = [
  {
    name: "Smallcase",
    description: "Thematic investing platforms to build diversified, long-term stock portfolios based on ideas, strategies, or trends.",
    iconUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=100&q=80",
    link: "https://www.smallcase.com"
  },
  {
    name: "Sensibull",
    description: "India's largest options trading platform. Create, analyze, and practice advanced option trading strategies risk-free.",
    iconUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=100&q=80",
    link: "https://sensibull.com"
  },
  {
    name: "Streak",
    description: "Create, backtest, and deploy algorithmic trading strategies live in the market without typing a single line of code.",
    iconUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=100&q=80",
    link: "https://www.streak.tech"
  },
  {
    name: "GoldenPi",
    description: "India's first marketplace for retail investors to search, evaluate, and invest online in Bonds and Corporate Fixed Deposits.",
    iconUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=100&q=80",
    link: "https://goldenpi.com"
  }
];

const AppCard = ({ app }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        maxWidth: "280px",
        minWidth: "250px",
        border: isHovered ? "1px solid #ddd" : "1px solid #eee",
        borderRadius: "4px",
        padding: "24px",
        backgroundColor: "#ffffff",
        boxShadow: isHovered ? "0 8px 20px rgba(0,0,0,0.04)" : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
        boxSizing: "border-box"
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px", gap: "14px" }}>
          <img 
            src={app.iconUrl} 
            alt={`${app.name} logo`} 
            style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover" }}
          />
          <h4 style={{ margin: 0, color: "#444444", fontSize: "15px", fontWeight: "500" }}>{app.name}</h4>
        </div>
        <p style={{ color: "#666666", fontSize: "13px", lineHeight: "1.6", margin: "0 0 24px 0" }}>
          {app.description}
        </p>
      </div>

      <a 
        href={app.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
        style={{
          display: "block",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
          padding: "10px",
          backgroundColor: isBtnHovered ? "#2463b0" : "#387ed1",
          color: "#ffffff",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "500",
          fontSize: "13px",
          transition: "background-color 0.12s ease"
        }}
      >
        Launch App
      </a>
    </div>
  );
};

const Apps = () => {
  return (
    <div 
      style={{ 
        fontFamily: "'Inter', -apple-system, sans-serif",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <h3 style={{ color: "#444444", fontSize: "22px", fontWeight: "500", margin: "0 0 6px 0", letterSpacing: "-0.3px" }}>
        Apps
      </h3>
      <p style={{ color: "#999999", fontSize: "14px", lineHeight: "1.5", margin: "0 0 35px 0" }}>
        Discover and instantly integrate native products within your trading ecosystem.
      </p>

      <div 
        style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "24px", 
          justifyContent: "flex-start",
          width: "100%"
        }}
      >
        {ECOSYSTEM_APPS.map((app) => (
          <AppCard key={app.name} app={app} />
        ))}
      </div>
    </div>
  );
};

export default Apps;