import React from "react";
import RegisterForm from "./registerForm";
import user from "../services/userService";
import auth from "../services/authService";

export default class Profile extends RegisterForm {
  state = {
    data: {
      name: auth.getCurrentUser().name,
      email: auth.getCurrentUser().email,
      password: "",
      password_confirmation: ""
    },
    form: {
      src: "../imgs/food.png",
      alt: "Logo",
      header: "Profile",
      body: "Update your profile now."
    },
    errors: {}
  };

  doSubmit = async () => {
    try {
      const response = await user.update(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/recipes";
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
      <div className="offset">
        <div className="row  justify-content-center">
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
              {this.renderButton("Update account")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
