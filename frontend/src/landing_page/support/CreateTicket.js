import React from "react";

function CreateTicket() {
  // Array array mapping containing unique support desk category matrices
  const supportTopics = [
    {
      title: "Account Opening",
      icon: "fa-plus-circle",
      links: [
        "Online Account Opening",
        "Offline Account Opening",
        "Company, Partnership and HUF Account Opening",
        "NRI Account Opening",
        "Charges at Zerodha",
        "Zerodha IDFC FIRST Bank 3-in-1 Account",
        "Getting Started"
      ]
    },
    {
      title: "Your Zerodha Account",
      icon: "fa-user-o",
      links: [
        "Login Credentials & 2FA",
        "Profile Modifications",
        "Demat Account Operations",
        "Nomination Regulations",
        "Transferring Shares",
        "Account Closure Requests"
      ]
    },
    {
      title: "Trading and Markets",
      icon: "fa-bar-chart",
      links: [
        "Trading Asset Offerings",
        "Kite Order Terminal Logic",
        "Corporate Actions Portfolio",
        "Margins and Leverage Limits",
        "Intraday / CNC Holdings",
        "Sentinel Alerts Matrix"
      ]
    },
    {
      title: "Funds Management",
      icon: "fa-credit-card",
      links: [
        "Adding Capital via UPI/Netbanking",
        "Withdrawal Pay-out Requests",
        "eMandate Setup and Verification",
        "Instant Credit Conversions",
        "Bank Account Modification Logs"
      ]
    },
    {
      title: "Console Analytics",
      icon: "fa-pie-chart",
      links: [
        "Tax P&L Ledger Statements",
        "Mutual Fund Folio Operations",
        "Corporate Gift Transactions",
        "Download Contract Notes",
        "Account Value Visualizations"
      ]
    },
    {
      title: "Coin Mutual Funds",
      icon: "fa-circle-o-notch",
      links: [
        "Direct Mutual Fund Sourcing",
        "SIP Modification Schemes",
        "NFO Allocation Requests",
        "Redemption Payout Timelines",
        "Demat Holdings Allotment"
      ]
    }
  ];

  // Intercept ticket item link triggers gracefully for your presentation
  const handleTicketAlert = (e, topicTitle, linkName) => {
    e.preventDefault();
    alert(`The Support Knowledgebase system for [${topicTitle} -> ${linkName}] is under active configuration. Helpdesk support features will integrate in the next platform release.`);
  };

  return (
    <div className="container my-5 py-3">
      <div className="row px-md-4 mb-4">
        
        {/* Support Entry Main Header */}
        <h2 className="fs-4 text-muted fw-normal mb-5">
          To create a ticket, select a relevant topic from the system portal
        </h2>

        {/* Scalable Programmatic Categories Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {supportTopics.map((topic, topicIdx) => (
            <div key={topicIdx} className="col p-4 mb-3">
              <h4 className="fs-5 text-dark mb-4 fw-normal d-flex align-items-center gap-2">
                <i className={`fa ${topic.icon}`} style={{ color: "#222" }} aria-hidden="true"></i> 
                {topic.title}
              </h4>
              
              {/* Context Links Stack */}
              <div className="d-flex flex-column align-items-start">
                {topic.links.map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href="#/"
                    onClick={(e) => handleTicketAlert(e, topic.title, link)}
                    className="mb-2 text-decoration-none lh-lg"
                    style={{ fontSize: "0.9rem", color: "#387ed1", transition: "color 0.2s" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CreateTicket;