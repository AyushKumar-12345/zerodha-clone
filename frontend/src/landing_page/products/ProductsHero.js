import React from "react";

function ProductsHero() {
  const handleOfferingsAlert = (e) => {
    e.preventDefault();
    alert("The complete investment products matrix catalog is under development and will unlock in an upcoming patch release.");
  };

  return (
    <div className="container border-bottom mb-5">
      <div className="text-center mt-5 p-3">
        <h1 className="display-5 text-dark fw-normal">Technology</h1>
        <h3 className="text-muted mt-3 fs-5 fw-normal">
          Sleek, modern, and intuitive trading platforms
        </h3>
        <p className="mt-3 mb-5">
          Check out our{" "}
          <a 
            href="#/" 
            onClick={handleOfferingsAlert} 
            className="text-decoration-none fw-medium"
            style={{ color: "#387ed1" }}
          >
            investment offerings{" "}
            <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default ProductsHero;