import React from "react";
import Joi from "joi-browser";
import user from "../services/userService";
import auth from "../services/authService";
import Form from "./common/form";

export default class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "", password_confirmation: "" },
    form: {
      src: "../imgs/food.png",
      alt: "Logo",
      header: "Register Now",
      body: "Discover amazing recipes based on products you have at home."
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password"),
    // password_confirmation: Joi.ref(".password")
    password_confirmation: Joi.string()
      .required()
      .label("Password Confirmation")
  };

  doSubmit = async () => {
    try {
      const response = await user.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/recipes";
      // window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
        const data = { ...this.state.data };
        data.email = "";
        this.setState({ data });
      }
    }
  };

  render() {
    return (
      <div className="row justify-content-center full-height">
        <div className="col-10 col-lg-8">
          {this.renderFormHeader(this.state.form)}
          <form onSubmit={this.handleSubmit} className="text-center">
            {this.renderInput("name", "Name", "text")}
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput(
              "password_confirmation",
              "Confirm Password",
              "password"
            )}
            {this.renderButton("Submit")}
            {this.renderFormFooter(
              "Alredy have an account?",
              "/home#login",
              "Login now"
            )}
          </form>
        </div>
      </div>
    );
  }
}
