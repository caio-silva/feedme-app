import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";

export default class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    form: {
      src: "../imgs/food.png",
      alt: "Logo",
      header: "Login",
      body: "Recipes you love one click away."
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);
      // window.location = "/recipes";
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
        const data = { ...this.state.data };
        data.password = "";
        this.setState({ data });
      }
    }
  };

  render() {
    return (
      <div className="row justify-content-center full-height">
        <div className="col-10 col-lg-8 h-100">
          {this.renderFormHeader(this.state.form)}
          <form onSubmit={this.handleSubmit} className="text-center">
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Submit")}
            {this.renderFormFooter(
              "Don't have an account?",
              "/home#register",
              "Register now"
            )}
          </form>
        </div>
      </div>
    );
  }
}
