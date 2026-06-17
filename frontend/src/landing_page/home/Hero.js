import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <div className="col-12">
          <img
            src="media/images/homeHero.png"
            alt="Zerodha Platform Workspace Hero View"
            className="img-fluid mb-5 d-block mx-auto"
            style={{ maxWidth: "75%" }}
          />
        </div>
        
        <h1 className="mt-4 display-5 text-dark fw-normal">Invest in everything</h1>
        <p className="text-muted fs-5 mb-4">
          Online platform to invest in stocks, derivatives, mutual funds, and more
        </p>

        <div className="col-12">
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-primary fs-5 px-4 py-2"
            style={{ backgroundColor: "#387ed1", border: "none", minWidth: "180px" }}
          >
            Signup Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;