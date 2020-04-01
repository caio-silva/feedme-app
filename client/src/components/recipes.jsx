import React, { Component } from "react";
import recipes from "../services/recipesService";
import Loading from "./common/loading";
import Recipe from "./recipe";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { SideBar } from "./sideBar";
import ItemsView from "./itemsView";

export default class Recipes extends Component {
  state = {
    items: [],
    item: {},
    pageSize: 10,
    currentPage: 1,
    isLoading: true,
    sideBar: ["All recipes", "Filtered recipes", "Cook now", "Stock"],
    selected: ""
  };

  async componentDidMount() {
    try {
      const { data: items } = await recipes.getRecipesWithSettings();
      this.setState({ selected: "Filtered recipes" });
      this.setState({ items });
      this.setState({ isLoading: false });
    } catch (ex) {
      toast.error("Sorry, there was an error.");
    }
  }

  onSelect = async e => {
    this.setState({ isLoading: true });
    this.setState({ item: {} });
    this.setState({ items: [] });

    switch (e.selected) {
      case "All recipes":
        try {
          this.setState({ selected: "All recipes" });
          const { data: items } = await recipes.getAllRecipes();
          this.setState({ currentPage: 1 });
          this.setState({ items });
          this.setState({ isLoading: false });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      case "Filtered recipes":
        try {
          this.setState({ selected: "Filtered recipes" });
          const { data: items } = await recipes.getRecipesWithSettings();
          this.setState({ currentPage: 1 });
          this.setState({ items });
          this.setState({ isLoading: false });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      case "Cook now":
        try {
          // debugger;
          this.setState({ selected: "Cook Now" });
          const { data: items } = await recipes.getFilteredRecipes();
          this.setState({ currentPage: 1 });

          this.setState({ items });
          this.setState({ isLoading: false });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      case "Stock":
        this.props.history.push("/products");
        break;

      case "Recipe":
        try {
          const { data: item } = await recipes.getRecipeById(e.id);
          this.setState({ item });
          this.setState({ isLoading: false });
          this.setState({ selected: "Recipe" });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      default:
        break;
    }
  };

  onChange = ({ currentTarget: input }) => {
    this.setState({ queryInput: input.value });
  };

  onPageChange = page => {
    this.setState({ currentPage: page });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  render() {
    const { items, pageSize, currentPage, isLoading } = this.state;
    const recipes = paginate(
      items.sort((a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase()
          ? -1
          : a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : 0
      ),
      currentPage,
      pageSize
    );

    return (
      <div className="offset container-fluid">
        <div className="row">
          <div className="col-3 mt-3 position-fixed">
            <SideBar
              items={this.state.sideBar}
              onSelect={this.onSelect}
              selected={this.state.selected}
              qnty={items.length}
              isLoading={isLoading}
            />
          </div>

          <div className="col-9 offset-3">
            {this.state.isLoading && <Loading />}

            {!this.state.isLoading &&
              this.state.selected.includes(this.state.selected) && (
                <ItemsView
                  recipes={recipes}
                  onSelect={this.onSelect}
                  onPageChange={this.onPageChange}
                  currentPage={this.state.currentPage}
                  itemsCount={this.state.items.length}
                  pageSize={this.state.pageSize}
                  {...this.props}
                />
              )}

            {!this.isLoading && this.state.selected === "Recipe" && (
              <Recipe
                item={this.state.item}
                // onSelect={this.onSelect}
                // onPageChange={this.onPageChange}
                // currentPage={this.currentPage}
                // itemsCount={this.state.items.length}
                // pageSize={this.state.pageSize}
                {...this.props}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
