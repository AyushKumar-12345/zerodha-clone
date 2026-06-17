import React from "react";

function Awards() {
  return (
    <div className="container my-5 py-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 p-4 p-md-5 text-center">
          <img src="media/images/largestBroker.svg" alt="Market Share Graph" className="img-fluid" />
        </div>
        <div className="col-12 col-md-6 p-4 p-md-5">
          <h1 className="display-6 fw-normal text-dark mb-4">Largest stock broker in India</h1>
          <p className="mb-4 text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row mb-5">
            <div className="col-6">
              <ul className="text-muted" style={{ lineHeight: "2" }}>
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="text-muted" style={{ lineHeight: "2" }}>
                <li>Stocks & IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-md-start">
            <img src="media/images/pressLogos.png" alt="Press Logos" style={{ width: "90%", maxWidth: "450px" }} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;