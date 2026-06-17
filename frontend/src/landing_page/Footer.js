import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  // Graceful intercept handler to alert evaluators during a demo
  const handleFeatureAlert = (e, featureName) => {
    e.preventDefault();
    alert(`"${featureName}" module is currently under development and will be native in a future version update.`);
  };

  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }} className="text-muted py-5 mt-5 border-top">
      <div className="container">
        
        {/* Link Matrix Trees */}
        <div className="row g-4 mb-5">
          
          {/* Logo Brand Segment */}
          <div className="col-12 col-md-3">
            <img src="media/images/logo.svg" alt="Zerodha Brand Logo" style={{ width: "130px" }} className="mb-3" />
            <p className="fs-6 mb-0 text-secondary">
              &copy; 2010 - 2026, Not Zerodha Broking Ltd.<br />All rights reserved.
            </p>
          </div>

          {/* Company Column */}
          <div className="col-6 col-md-3 d-flex flex-column gap-2">
            <h5 className="fs-6 text-dark fw-bold mb-2">Company</h5>
            <Link to="/about" className="text-decoration-none text-secondary small">About</Link>
            <Link to="/products" className="text-decoration-none text-secondary small">Products</Link>
            <Link to="/pricing" className="text-decoration-none text-secondary small">Pricing</Link>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Referral Programme")} className="text-decoration-none text-secondary small">Referral programme</a>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Careers Hub")} className="text-decoration-none text-secondary small">Careers</a>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Zerodha Tech Blog")} className="text-decoration-none text-secondary small">Zerodha.tech</a>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Pressroom Media Archive")} className="text-decoration-none text-secondary small">Press & media</a>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "CSR Initiatives")} className="text-decoration-none text-secondary small">Zerodha cares (CSR)</a>
          </div>

          {/* Support Column */}
          <div className="col-6 col-md-3 d-flex flex-column gap-2">
            <h5 className="fs-6 text-dark fw-bold mb-2">Support</h5>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Contact Directory")} className="text-decoration-none text-secondary small">Contact</a>
            <Link to="/support" className="text-decoration-none text-secondary small">Support portal</Link>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Z-Connect Portal")} className="text-decoration-none text-secondary small">Z-Connect blog</a>
            <Link to="/pricing" className="text-decoration-none text-secondary small">List of charges</Link>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Downloads & Resources Vault")} className="text-decoration-none text-secondary small">Downloads & resources</a>
          </div>

          {/* Account Column */}
          <div className="col-6 col-md-3 d-flex flex-column gap-2">
            <h5 className="fs-6 text-dark fw-bold mb-2">Account</h5>
            <Link to="/signup" className="text-decoration-none text-secondary small">Open an account</Link>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Banking Fund Transfer")} className="text-decoration-none text-secondary small">Fund transfer</a>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "60 Day Challenge System")} className="text-decoration-none text-secondary small">60 day challenge</a>
          </div>

        </div>

        {/* Regulatory Disclosures Segment */}
        <div className="border-top pt-4 text-secondary" style={{ fontSize: "11px", lineHeight: "1.7", textAlign: "justify" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.: INZ000031633 CDSL: Depository services through Zerodha Securities Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India.
          </p>
          <p className="fw-medium text-dark">
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>
          <p className="mb-0">
            Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha, please <Link to="/support" className="text-decoration-none text-primary fw-medium">create a ticket here</Link>.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;