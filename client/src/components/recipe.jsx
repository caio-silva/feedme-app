import React from "react";
import recipes from "../services/recipesService";
import Recipes from "./recipes";
import { SideBar } from "./sideBar";

export default class Recipe extends Recipes {
  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: item } = await recipes.getRecipeById(
      this.props.match.params.id
    );
    this.setState({ item });
    this.setState({ isLoading: false });
  }

  onSelect = e => {
    this.props.history.push("/recipes");
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
                src={image}
                alt={title}
                style={{ borderRadius: "5px", boxShadow: "5px 5px #222" }}
              />
              <div className="row mt-3">
                <div className="col-md-6 text-left">
                  <h3 className="text-center">Ingredients</h3>
                  <ul>
                    {!this.state.isLoading &&
                      this.state.item.extendedIngredients.map(item => (
                        <li
                          style={{ listStyle: "none" }}
                          // className="badge badge-light"
                          // style={{
                          //   display: "inline-block",
                          //   margin: ".5rem .5rem",
                          //   backgroundColor: "#111"
                          // }}
                        >
                          {item.original}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h3 className="text-center">Highlights</h3>
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
              <div className="text-left">
                <h3>Method</h3>
                <ol>
                  {instructions &&
                    instructions
                      .split(".")
                      .map(i => (
                        <li key={Math.random()}>
                          {i.replace(/<\/?[a-z]*?>/gi, "")}
                        </li>
                      ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
