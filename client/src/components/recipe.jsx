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
        <div className="container-fluid">
          <div className="row justify-content-center my-2 ">
            <div
              className="col-8 text-center mb-4"
              style={{
                backgroundColor: "#f4f4f4",
                color: "#000",
                borderRadius: "5px"
              }}
            >
              <h1>{title}</h1>
              <img
                src={image}
                alt={title}
                style={{ borderRadius: "5px", boxShadow: "5px 5px #222" }}
              />
              <br />
              <br />
              <ul className="text-center" style={{ listStyle: "one" }}>
                {instructions &&
                  instructions
                    .split(".")
                    .map(i => <li>{i.replace(/<\/?[a-z]*?>/gi, "")}</li>)}
              </ul>
              <span
                className="badge badge-light"
                style={{
                  display: "inline-block",
                  margin: "0 1rem",
                  backgroundColor: "#111"
                }}
              >
                {rest.vegan ? "Vegan" : ""}
              </span>
              <span
                className="badge badge-light"
                style={{
                  display: "inline-block",
                  margin: "0 1rem",
                  backgroundColor: "#111"
                }}
              >
                {rest.vegetarian ? "Vegetarian" : ""}
              </span>
              <span
                className="badge badge-light"
                style={{
                  display: "inline-block",
                  margin: "0 1rem",
                  backgroundColor: "#111"
                }}
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
