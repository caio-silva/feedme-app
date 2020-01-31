import React from "react";
import LandingPage from "./homeComponents/landingPage";
import Features from "./homeComponents/features";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";

const Home = () => {
  return (
    <React.Fragment>
      <div id="home" className="offsetLanding">
        <LandingPage />
      </div>
      <div id="features" className="offset">
        <Features />
      </div>
      <div id="register" className="offset">
        <RegisterForm />
      </div>
      <div id="login" className="offset">
        <LoginForm />
      </div>
    </React.Fragment>
  );
};
export default Home;
