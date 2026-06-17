import React from "react";

function Education() {
  const handleFeatureAlert = (e, featureName) => {
    e.preventDefault();
    alert(`${featureName} is under active development and will be unlocked in an upcoming system release lifecycle.`);
  };

  return (
    <div className="container my-5 py-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center mb-5 mb-md-0">
          <img src="media/images/education.svg" alt="Education Illustration" style={{ width: "80%", maxWidth: "400px" }} className="img-fluid" />
        </div>
        <div className="col-12 col-md-6 px-md-5">
          <h1 className="mb-4 display-6 fw-normal text-dark">Free and open market education</h1>
          
          <div className="mb-5">
            <p className="text-muted mb-2" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
              Varsity, the largest online stock market education book in the world
              covering everything from the basics to advanced trading.
            </p>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "Varsity")} className="text-decoration-none fw-medium" style={{ color: "#387ed1" }}>
              Varsity <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
          
          <div>
            <p className="text-muted mb-2" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
              TradingQ&A, the most active trading and investment community in
              India for all your market related queries.
            </p>
            <a href="#/" onClick={(e) => handleFeatureAlert(e, "TradingQ&A")} className="text-decoration-none fw-medium" style={{ color: "#387ed1" }}>
              TradingQ&A <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;