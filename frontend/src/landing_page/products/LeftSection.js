import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  
  const handleFutureFeatureAlert = (e, targetName) => {
    e.preventDefault();
    alert(`"${targetName}" platform gateway is currently under active development and will be native in an upcoming version update.`);
  };

  return (
    <div className="container my-5 py-3">
      <div className="row align-items-center g-5">
        <div className="col-12 col-md-6 text-center">
          <img src={imageURL} alt={`${productName} Showcase Graphic`} className="img-fluid" style={{ maxWidth: "85%" }} />
        </div>
        <div className="col-12 col-md-6 px-md-5">
          <h1 className="mb-4 display-6 fw-normal text-dark">{productName}</h1>
          <p className="text-muted mb-4" style={{ fontSize: "1.02rem", lineHeight: "1.7" }}>{productDescription}</p>
          
          {/* Interactive Web Fallbacks */}
          <div className="d-flex align-items-center gap-4 mb-4">
            <a 
              href="#/" 
              onClick={(e) => handleFutureFeatureAlert(e, `${productName} Web Terminal Demo`)} 
              className="text-decoration-none fw-medium"
              style={{ color: "#387ed1" }}
            >
              Try Demo <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
            <a 
              href="#/" 
              onClick={(e) => handleFutureFeatureAlert(e, `${productName} Analytical Documentation`)} 
              className="text-decoration-none fw-medium"
              style={{ color: "#387ed1" }}
            >
              Learn More <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
          
          {/* Mobile Store Fallbacks */}
          <div className="d-flex align-items-center gap-3 pt-2">
            <a href="#/" onClick={(e) => handleFutureFeatureAlert(e, `${productName} Android Ecosystem Deployment`)}>
              <img src="media/images/googlePlayBadge.svg" alt="Get it on Google Play Store" style={{ height: "40px" }} />
            </a>
            <a href="#/" onClick={(e) => handleFutureFeatureAlert(e, `${productName} Apple iOS Ecosystem Deployment`)}>
              <img
                src="media/images/appstoreBadge.svg"
                alt="Download on the Apple App Store"
                style={{ height: "40px" }}
              />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LeftSection;