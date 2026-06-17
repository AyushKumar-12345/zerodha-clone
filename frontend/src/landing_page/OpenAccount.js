import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();

  return (
    <div className="container my-5 py-3">
      <div className="row text-center justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          
          {/* Main Action Header */}
          <h1 className="display-6 text-dark fw-normal mb-3">Open a Zerodha account</h1>
          <p className="text-muted fs-6 mb-4">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
            F&O trades.
          </p>
          
          {/* Managed Client Onboarding Router Trigger */}
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-primary fs-5 px-4 py-2 mt-2"
            style={{ backgroundColor: "#387ed1", border: "none", minWidth: "200px" }}
          >
            Sign up Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default OpenAccount;