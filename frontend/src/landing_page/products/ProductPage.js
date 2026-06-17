import React from "react";

// Section layouts
import ProductsHero from "./ProductsHero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductsPage() {
  return (
    <>
      {/* 1. Technology Feature Header */}
      <ProductsHero />

      {/* 2. Flagship Trading App Profile: Kite */}
      <LeftSection
        imageURL="media/images/kite.png"
        productName="Kite"
        productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo="#/"
        learnMore="#/"
        googlePlay="#/"
        appStore="#/"
      />

      {/* 3. Central Ledger Reporting Panel: Console */}
      <RightSection
        imageURL="media/images/console.png"
        productName="Console"
        productDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
        learnMore="#/"
      />

      {/* 4. Mutual Funds Wrapper Node: Coin */}
      <LeftSection
        imageURL="media/images/coin.png"
        productName="Coin"
        productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        tryDemo="#/"
        learnMore="#/"
        googlePlay="#/"
        appStore="#/"
      />

      {/* 5. Developer Infrastructure API Suite: Kite Connect */}
      <RightSection
        imageURL="media/images/kiteconnect.png"
        productName="Kite Connect API"
        productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        learnMore="#/"
      />

      {/* 6. Education Suite Mobile Node: Varsity */}
      <LeftSection
        imageURL="media/images/varsity.png"
        productName="Varsity mobile"
        productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        tryDemo="#/"
        learnMore="#/"
        googlePlay="#/"
        appStore="#/"
      />

      {/* Corporate Engineering Informational Link */}
      <div className="container text-center my-5 py-4">
        <p className="text-muted fs-6 mb-0">
          Want to know more about our technology stack? Check out the{" "}
          <a 
            href="#/" 
            className="text-decoration-none fw-medium" 
            style={{ color: "#387ed1" }}
            onClick={(e) => { e.preventDefault(); alert("The technical engineering blog is currently offline for scheduled maintenance."); }}
          >
            Zerodha.tech blog
          </a>.
        </p>
      </div>

      {/* 7. Partner Ecosystem Grid Matrix Footer */}
      <Universe />
    </>
  );
}

export default ProductsPage;