import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import user from "../services/userService";

export default class Dashboard extends Form {
  state = {
    settings: {
      dairyFree: false,
      glutenFree: false,
      vegan: false,
      vegetarian: false
    }
  };

  async componentDidMount() {
    const response = await user.getSettings();
    const { settings } = response.data;
    this.setState({ settings });
  }

  schema = {
    vegetarian: Joi.boolean(),
    vegan: Joi.boolean(),
    glutenFree: Joi.boolean(),
    dairyFree: Joi.boolean()
  };

  render() {
    return (
      <div className="offset">
        <div className="row justify-content-center full-height">
          <div className="col-10 col-lg-8 h-100">
            {this.renderInputCheckBox("vegetarian", "Vegetarian")}
            {this.renderInputCheckBox("vegan", "Vegan")}
            {this.renderInputCheckBox("glutenFree", "Gluten Free")}
            {this.renderInputCheckBox("dairyFree", "Dairy Free")}
          </div>
        </div>
      </div>
    );
  }
}
