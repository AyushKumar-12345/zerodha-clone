import React from "react";

function Team() {
  const handleExternalRedirect = (e, targetUrl, platformName) => {
    e.preventDefault();
    alert(`"${platformName}" link clicked. In production, this securely redirects to: ${targetUrl}`);
  };

  return (
    <div className="container py-5 my-5">
      <div className="row text-center mb-5">
        <h1 className="display-6 fw-normal text-dark">People</h1>
      </div>

      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-12 col-md-4 text-center px-4 mb-4 mb-md-0">
          <div className="position-relative d-inline-block">
            <img 
              src="media/images/Ayush_Kumar.png" 
              alt="Ayush Kumar - Founder, CEO" 
              className="img-fluid rounded-circle shadow-sm"
              style={{ 
                width: "240px", 
                height: "240px", 
                objectFit: "cover"
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/240/cccccc/ffffff?text=AK";
              }}
            />
          </div>
          <h2 className="fs-4 text-dark mt-4 mb-1 fw-normal">Ayush Kumar</h2>
          <p className="text-muted small">Founder, CEO</p>
        </div>

        <div className="col-12 col-md-6 px-4">
          <p className="text-secondary mb-3" style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
            Ayush bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade-long stint as a trader. Today,
            Zerodha has completely transformed the landscape of the Indian broking industry.
          </p>
          <p className="text-secondary mb-3" style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
            He is a core member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p className="text-secondary mb-4" style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
            Playing basketball is his zen.
          </p>
          
          <div className="text-muted mt-4" style={{ fontSize: "0.95rem" }}>
            Connect on{" "}
            <a 
              href="https://homepage.com" 
              onClick={(e) => handleExternalRedirect(e, "https://homepage.com", "Your Personal Homepage")}
              className="text-decoration-none fw-medium mx-1"
              style={{ color: "#387ed1" }}
            >
              Homepage
            </a>{" "}
            /{" "}
            <a 
              href="https://tradingqna.com" 
              onClick={(e) => handleExternalRedirect(e, "https://tradingqna.com", "TradingQnA Forum")}
              className="text-decoration-none fw-medium mx-1"
              style={{ color: "#387ed1" }}
            >
              TradingQnA
            </a>{" "}
            /{" "}
            <a 
              href="https://twitter.com" 
              onClick={(e) => handleExternalRedirect(e, "https://twitter.com", "Official Twitter Feed")}
              className="text-decoration-none fw-medium mx-1"
              style={{ color: "#387ed1" }}
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;