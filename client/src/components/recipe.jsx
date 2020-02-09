import React, { Component } from "react";
import recipes from "../services/recipesService";

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      recipe: {}
    };
  }

  async componentDidMount() {
    const { data: recipe } = await recipes.getRecipeById(this.state.id);
    this.setState({ recipe });
  }
  render() {
    const { image, title, instructions, ...rest } = this.state.recipe;
    if (this.state.recipe === "not-found")
      this.props.history.replace("/not-found");
    return (
      <div className="offset">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-8 text-center mb-4"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              <h1>{title}</h1>
              <img src={image} alt={title} />
              <br />
              <br />
              {instructions && instructions.split(".").map(i => <p>{i}</p>)}
              <span
                className="badge badge-light"
                style={{ display: "inline-block", margin: "0 1rem" }}
              >
                {rest.vegan ? "Vegan" : ""}
              </span>
              <span
                className="badge badge-light"
                style={{ display: "inline-block", margin: "0 1rem" }}
              >
                {rest.vegetarian ? "Vegetarian" : ""}
              </span>
              <span
                className="badge badge-light"
                style={{ display: "inline-block", margin: "0 1rem" }}
              >
                {rest.readyInMinutes} min prep
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
