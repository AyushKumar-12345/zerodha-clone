import React from "react";

function SupportHero() {
  // Gracefully handles helpdesk interaction clicks during the demo
  const handleSupportAction = (e, targetFeature) => {
    e.preventDefault();
    alert(`"${targetFeature}" portal is under active synchronization and will unlock in an upcoming update.`);
  };

  return (
    <section className="container-fluid text-white py-5" id="supportHero" style={{ backgroundColor: "#387ed1" }}>
      
      {/* Header Portal Title Bar */}
      <div className="container d-flex justify-content-between align-items-center mb-5" id="supportWrapper">
        <h4 className="fs-5 fw-normal m-0 text-white">Support Portal</h4>
        <a 
          href="#/" 
          onClick={(e) => handleSupportAction(e, "Track Tickets Module")} 
          className="text-white text-decoration-none fw-normal border-bottom border-white pb-1"
          style={{ fontSize: "0.95rem" }}
        >
          Track Tickets
        </a>
      </div>

      {/* Main Form Search Bar Matrix */}
      <div className="container row mx-auto my-4 g-4">
        
        {/* Left Column: Search & Direct Assist Anchors */}
        <div className="col-12 col-md-7 px-0 pe-md-4">
          <h1 className="fs-3 fw-normal text-white mb-4 lh-base" style={{ maxWidth: "560px" }}>
            Search for an answer or browse help topics to create a ticket
          </h1>
          
          <div className="d-flex mb-4 position-relative" style={{ maxWidth: "580px" }}>
            <input 
              type="text"
              className="form-control form-control-lg border-0 rounded-0 bg-white px-3 py-3 fs-6"
              placeholder="Eg. how do I activate F&O, change address, etc." 
              style={{ boxShadow: "none", paddingRight: "50px" }}
            />
            <button 
              className="btn position-absolute top-50 end-0 translate-middle-y text-muted border-0 bg-transparent px-3" 
              onClick={(e) => handleSupportAction(e, "Knowledgebase Query execution")}
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>

          <div className="d-flex flex-wrap gap-x-4 gap-y-2 mt-2">
            <a href="#/" onClick={(e) => handleSupportAction(e, "Track account opening")} className="text-white text-decoration-none border-bottom border-white fs-6 pb-1">Track account opening</a>
            <a href="#/" onClick={(e) => handleSupportAction(e, "Track segment activation")} className="text-white text-decoration-none border-bottom border-white fs-6 pb-1">Track segment activation</a>
            <a href="#/" onClick={(e) => handleSupportAction(e, "Intraday margins reference")} className="text-white text-decoration-none border-bottom border-white fs-6 pb-1">Intraday margins</a>
            <a href="#/" onClick={(e) => handleSupportAction(e, "Kite user manual doc")} className="text-white text-decoration-none border-bottom border-white fs-6 pb-1">Kite user manual</a>
          </div>
        </div>

        {/* Right Column: Featured Interactive Feed Links */}
        <div className="col-12 col-md-5 px-0 ps-md-5 mt-5 mt-md-0">
          <h2 className="fs-4 fw-normal text-white mb-4">Featured</h2>
          <ol className="text-white ps-3" style={{ lineHeight: "2" }}>
            <li className="mb-3">
              <a 
                href="#/" 
                onClick={(e) => handleSupportAction(e, "Corporate Takeovers Archive")} 
                className="text-white text-decoration-none border-bottom border-white pb-1 fs-6"
              >
                Current Takeovers and Delisting - January 2024
              </a>
            </li>
            <li>
              <a 
                href="#/" 
                onClick={(e) => handleSupportAction(e, "Intraday leverages tracking feed")} 
                className="text-white text-decoration-none border-bottom border-white pb-1 fs-6"
              >
                Latest Intraday leverages - MIS & CO
              </a>
            </li>
          </ol>
        </div>

      </div>
    </section>
  );
}

export default SupportHero;