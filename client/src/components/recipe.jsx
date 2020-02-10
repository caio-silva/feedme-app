import React from "react";
import recipes from "../services/recipesService";
import Recipes from "./recipes";
import { SideBar } from "./sideBar";

export default class Recipe extends Recipes {
  async componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({ selected: "Recipe" });
    const { data: item } = await recipes.getRecipeById(
      this.props.match.params.id
    );
    this.setState({ item });
    this.setState({ isLoading: false });
  }

  onSelect = e => {
    console.log(e);
    this.setState({ selected: e });

    this.props.history.push("/recipes");
    console.log(this.state.selected);
  };

  render() {
    const { image, title, instructions, ...rest } = this.state.item;
    const { isLoading, items } = this.state;
    if (this.state.item === "not-found")
      this.props.history.replace("/not-found");
    return (
      <div className="offset">
        <div className="container-fluid">
          <div className="row  my-2 ">
            <div className="col-3 mt-3 position-fixed">
              <SideBar
                items={this.state.sideBar}
                onSelect={this.onSelect}
                selected={this.state.selected}
                qnty={items.length}
                isLoading={isLoading}
              />
            </div>
            <div
              className="col-8 text-center my-3 offset-3"
              style={{
                backgroundColor: "#f4f4f4",
                color: "#000",
                borderRadius: "5px"
              }}
            >
              <h1>{title}</h1>
              <img
                className="img-fluid"
                src={image}
                alt={title}
                style={{
                  borderRadius: "5px",
                  boxShadow: "5px 5px #222",
                  maxWidth: "100%,",
                  height: "auto"
                }}
              />
              <div className="row justify-content-around mt-3">
                <div className="col-md-6 text-left">
                  <h3 className="text-center mb-3">Ingredients</h3>
                  <ul>
                    {!this.state.isLoading &&
                      this.state.item.extendedIngredients.map(item => (
                        <li style={{ listStyle: "none" }}>{item.original}</li>
                      ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h3 className="text-center mb-3">Highlights</h3>
                  <span
                    className="badge badge-light"
                    style={{
                      display: "inline-block",
                      margin: ".5rem .5rem",
                      backgroundColor: "#111"
                    }}
                  >
                    {rest.vegan ? "Vegan" : ""}
                  </span>
                  <span
                    className="badge badge-light"
                    style={{
                      display: "inline-block",
                      margin: ".5rem .5rem",
                      backgroundColor: "#111"
                    }}
                  >
                    {rest.vegetarian ? "Vegetarian" : ""}
                  </span>
                  <span
                    className="badge badge-light"
                    style={{
                      display: "inline-block",
                      margin: ".5rem .5rem",
                      backgroundColor: "#111"
                    }}
                  >
                    {rest.readyInMinutes} min prep
                  </span>
                </div>
              </div>
              <div className="text-left mt-3">
                <h3>Method</h3>
                <ol>
                  {instructions &&
                    instructions
                      .split(".")
                      .slice(0, instructions.split(".").length - 1)
                      .map(i => (
                        <li key={Math.random()}>
                          <span
                            style={{
                              marginLeft: "0.5rem"
                            }}
                          >
                            {i.replace(/<\/?[a-z]*?>/gi, "")}
                          </span>
                        </li>
                      ))}
                </ol>
              </div>
              <button
                className="btn btn-primary"
                onClick={this.props.history.goBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
