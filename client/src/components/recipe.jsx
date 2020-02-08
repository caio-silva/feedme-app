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
    const { image, title, vegan, vegetarian } = this.state.recipe;
    console.log(this.state.recipe);
    return (
      <div className="offset">
        <h1>{title}</h1>
        <h2>{vegan}</h2>
        <h2>{vegetarian}</h2>
        <img src={image} alt={title} />
      </div>
    );
  }
}
