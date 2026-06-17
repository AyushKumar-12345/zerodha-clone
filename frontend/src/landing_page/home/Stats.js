import React from "react";

function Stats() {
  const handleDevelopmentAlert = (e, moduleName) => {
    e.preventDefault();
    alert(`${moduleName} profile tools are currently under active development and will be integrated natively in an upcoming application patch.`);
  };

  return (
    <div className="container my-5 py-3">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 p-4 p-md-5">
          <h1 className="display-6 text-dark fw-normal mb-5">Trust with confidence</h1>
          
          <h2 className="fs-5 text-dark fw-medium mb-2">Customer-first always</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.02rem", lineHeight: "1.7" }}>
            That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
            worth of equity investments.
          </p>
          
          <h2 className="fs-5 text-dark fw-medium mb-2">No spam or gimmicks</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.02rem", lineHeight: "1.7" }}>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          
          <h2 className="fs-5 text-dark fw-medium mb-2">The Zerodha universe</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.02rem", lineHeight: "1.7" }}>
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          
          <h2 className="fs-5 text-dark fw-medium mb-2">Do better with money</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.02rem", lineHeight: "1.7" }}>
            With initiatives like Nudge and Kill Switch, we don't just
            facilitating transactions, but actively help you do better with your
            money.
          </p>
        </div>

        <div className="col-12 col-md-6 p-4 p-md-5 text-center">
          <img 
            src="media/images/ecosystem.png" 
            alt="Zerodha Product Ecosystem Grid Graphic"
            className="img-fluid mb-4 d-block mx-auto"
            style={{ maxWidth: "95%" }}
          />
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 mt-4">
            <a 
              href="#/" 
              className="text-decoration-none fw-medium" 
              onClick={(e) => handleDevelopmentAlert(e, "Product Exploration")}
              style={{ color: "#387ed1" }}
            >
              Explore our products{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
            <a 
              href="#/" 
              className="text-decoration-none fw-medium"
              onClick={(e) => handleDevelopmentAlert(e, "Kite Interactive Terminal")}
              style={{ color: "#387ed1" }}
            >
              Try Kite demo{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;