import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/home">
        <img src="../../imgs/food.png" alt="feedMe Logo" />
        <span className="mt-3 ml-2">feedMe</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbarResponsive">
        {!user && (
          <React.Fragment>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link " href="#home">
                  home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#register">
                  register
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#login">
                  login
                </a>
              </li>
            </ul>
          </React.Fragment>
        )}

        {user && (
          <React.Fragment>
            <div className="nav-item nav-link d-xs-none d-lg-flex">
              <span>Hi, {user.name}</span>
            </div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" user={user} to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/recipes">
                  Recipes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
