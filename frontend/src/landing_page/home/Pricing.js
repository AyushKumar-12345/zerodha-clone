import React from "react";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();

  const handlePricingRedirect = (e) => {
    e.preventDefault();
    navigate("/pricing");
  };

  return (
    <div className="container my-5 py-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-5 mb-5 mb-md-0">
          <h1 className="mb-3 display-6 fw-normal text-dark">Unbeatable pricing</h1>
          <p className="text-muted mb-4" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="/pricing" onClick={handlePricingRedirect} className="text-decoration-none fw-medium" style={{ color: "#387ed1" }}>
            See Pricing{" "}
            <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
          </a>
        </div>
        
        <div className="col-12 col-md-7">
          <div className="row text-center g-3">
            <div className="col-12 col-sm-6">
              <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column justify-content-center">
                <h1 className="mb-3 text-dark fw-normal display-5">₹0</h1>
                <p className="text-muted mb-0 small">
                  Free equity delivery and
                  <br />
                  direct mutual funds
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column justify-content-center">
                <h1 className="mb-3 text-dark fw-normal display-5">₹20</h1>
                <p className="text-muted mb-0 small">Intraday and F&O</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;