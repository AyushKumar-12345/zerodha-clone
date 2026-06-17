import React from "react";
import OpenAccount from "../OpenAccount";

// 1. Inline Hero Component with text-based visual fallbacks (No broken image dependencies)
function LocalHero() {
  return (
    <div className="container my-5 py-3">
      <div className="row p-5 text-center">
        <h1 className="display-4 text-dark fw-normal">Pricing</h1>
        <h3 className="text-muted mt-3 fs-5 fw-normal">
          Free equity investments and flat ₹20 intraday and F&O trades
        </h3>
      </div>
      
      <div className="row p-md-5 text-center g-4">
        <div className="col-12 col-md-4 p-4">
          <div className="mb-4 d-flex align-items-center justify-content-center bg-light mx-auto rounded-circle" style={{ width: "100px", height: "100px" }}>
            <span className="fs-1 fw-bold text-success">₹0</span>
          </div>
          <h2 className="fs-4 text-dark fw-medium mb-3">Free equity delivery</h2>
          <p className="text-muted small lh-base">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>

        <div className="col-12 col-md-4 p-4">
          <div className="mb-4 d-flex align-items-center justify-content-center bg-light mx-auto rounded-circle" style={{ width: "100px", height: "100px" }}>
            <span className="fs-1 fw-bold text-primary">₹20</span>
          </div>
          <h2 className="fs-4 text-dark fw-medium mb-3">Intraday and F&O trades</h2>
          <p className="text-muted small lh-base">
            Flat Rs. 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades.
          </p>
        </div>

        <div className="col-12 col-md-4 p-4">
          <div className="mb-4 d-flex align-items-center justify-content-center bg-light mx-auto rounded-circle" style={{ width: "100px", height: "100px" }}>
            <span className="fs-1 fw-bold text-success">₹0</span>
          </div>
          <h2 className="fs-4 text-dark fw-medium mb-3">Free direct MF</h2>
          <p className="text-muted small lh-base">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

// 2. Inline Brokerage Component (Cleaned up to completely remove the empty "List of charges" section)
function LocalBrokerage() {
  const handleCalculatorAlert = (e, targetName) => {
    e.preventDefault();
    alert(`${targetName} tool integration is currently under development and will launch in the next version update.`);
  };

  return (
    <div className="container my-5">
      <div className="row p-md-5 mt-5 border-top g-4">
        <div className="col-12 p-4">
          <a href="#/" onClick={(e) => handleCalculatorAlert(e, "Brokerage Calculator")} className="text-decoration-none">
            <h3 className="fs-4 mb-4 text-start fw-medium" style={{ color: "#387ed1" }}>Brokerage calculator</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.2", fontSize: "0.95rem" }}
            className="text-muted ps-3"
          >
            <li className="mb-2">Call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.</li>
            <li className="mb-2">Digital contract notes will be sent via e-mail.</li>
            <li className="mb-2">Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply.</li>
            <li className="mb-2">For NRI account (non-PIS), 0.5% or ₹100 per executed order for equity (whichever is lower).</li>
            <li className="mb-2">For NRI account (PIS), 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
            <li className="mb-2">If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// 3. Combined Parent Page Layout
function PricingPage() {
  return (
    <>
      <LocalHero />
      <OpenAccount />
      <LocalBrokerage />
    </>
  );
}

export default PricingPage;