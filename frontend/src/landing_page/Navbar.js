import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top navbar-light"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        {/* Brand Identity / Home Route Trigger */}
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "130px" }}
            alt="Zerodha Workspace Logo"
          />
        </Link>
        
        {/* Responsive Mobile Layout Hamburger Button Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Global Navigation Links Hub Container */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* ms-auto pushes the main nav menu options elegantly to the right edge */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-md-3">
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/support">
                Support
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;