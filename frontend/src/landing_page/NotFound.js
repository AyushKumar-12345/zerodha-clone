import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container p-5 my-5 text-center">
      <div className="row justify-content-center py-5">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="display-4 text-dark mb-3 fw-normal">404 Not Found</h1>
          <p className="text-muted fs-5 mb-4">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="btn btn-primary px-4 py-2 fs-6" 
            style={{ backgroundColor: "#387ed1", border: "none", minWidth: "150px" }}
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;