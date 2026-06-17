import React from "react";

function RightSection({ imageURL, productName, productDescription, learnMore }) {
  
  const handleFutureFeatureAlert = (e, targetName) => {
    e.preventDefault();
    alert(`"${targetName}" ledger system is under active development and will be native in an upcoming version update.`);
  };

  return (
    <div className="container my-5 py-3">
      <div className="row align-items-center g-5">
        <div className="col-12 col-md-6 order-2 order-md-1 px-md-5">
          <h1 className="mb-4 display-6 fw-normal text-dark">{productName}</h1>
          <p className="text-muted mb-4" style={{ fontSize: "1.02rem", lineHeight: "1.7" }}>{productDescription}</p>
          <div className="mt-4">
            <a 
              href="#/" 
              onClick={(e) => handleFutureFeatureAlert(e, `${productName} Portal Documentation`)}
              className="text-decoration-none fw-medium"
              style={{ color: "#387ed1" }}
            >
              Learn More <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6 order-1 order-md-2 text-center">
          <img src={imageURL} alt={`${productName} Showcase Interface`} className="img-fluid" style={{ maxWidth: "85%" }} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;