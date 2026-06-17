import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

  const partnerPlatforms = [
    { logo: "media/images/smallcaseLogo.png", desc: "Thematic investing platform" },
    { logo: "media/images/streakLogo.png", desc: "Algo & strategy trading platform" },
    { logo: "media/images/sensibullLogo.png", desc: "Options trading platform" },
    { logo: "media/images/zerodhaFundhouse.png", desc: "Simple, transparent index funds" },
    { logo: "media/images/goldenpiLogo.png", desc: "Bonds and debentures trading platform" },
    { logo: "media/images/dittoLogo.png", desc: "Insurance advice simplified" },
  ];

  return (
    <div className="container my-5 py-5">
      <div className="row text-center justify-content-center">
        
        <h1 className="display-6 text-dark fw-normal mb-2">The Zerodha Universe</h1>
        <p className="text-muted fs-6 mb-5 col-10 col-md-8 mx-auto">
          Extend your trading and investment experience even further with our partner platforms
        </p>

        <div className="row col-12 mx-auto mb-4 g-4">
          {partnerPlatforms.map((platform, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 p-4 d-flex flex-column align-items-center justify-content-center">
              <img 
                src={platform.logo} 
                alt={`${platform.desc} Branding`} 
                className="img-fluid mb-3" 
                style={{ height: "45px", objectFit: "contain", maxWidth: "80%" }}
              />
              <small className="text-muted d-block px-3" style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                {platform.desc}
              </small>
            </div>
          ))}
        </div>

        <div className="col-12 mt-5">
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

export default Universe;