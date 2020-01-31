import React from "react";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="landing">
        <div className="home-wrap">
          <div className="home-inner"></div>
        </div>
      </div>
      <div className="caption text-center">
        <h1>Welcome to feedMe</h1>
        <h3>The recipes you love at your finger tip.</h3>
        <a className="btn btn-outline-light btn-lg" href="#register">
          Get started
        </a>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
