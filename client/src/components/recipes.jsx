import ItemView from "./common/itemView";
import React, { Component } from "react";
import recipes from "../services/recipesService";
import Pagination from "./common/pagination";
import Loading from "./common/loading";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { SideBar } from "./sideBar";

export default class Recipes extends Component {
  state = {
    items: [],
    pageSize: 12,
    currentPage: 1,
    isLoading: true,
    sideBar: ["All recipes", "Filtered recipes", "Cook now", "Stock"],
    sideBarR: ""
  };

  async componentDidMount() {
    try {
      const { data: items } = await recipes.getRecipesWithSettings();
      this.setState({ isLoading: false });
      this.setState({ sideBarR: "Filtered recipes" });
      this.setState({ items });
    } catch (ex) {
      toast.error("Sorry, there was an error.");
    }
  }

  onSelect = async e => {
    this.setState({ items: [] });
    this.setState({ isLoading: true });
    switch (e) {
      case "All recipes":
        try {
          const { data: items } = await recipes.getAllRecipes();
          this.setState({ isLoading: false });
          this.setState({ sideBarR: "All recipes" });
          this.setState({ items });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      case "Filtered recipes":
        try {
          const { data: items } = await recipes.getRecipesWithSettings();
          this.setState({ isLoading: false });
          this.setState({ sideBarR: "Filtered recipes" });
          this.setState({ items });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      case "Cook now":
        try {
          const { data: items } = await recipes.getFilteredRecipes();
          this.setState({ isLoading: false });
          this.setState({ sideBarR: "Cook Now" });
          this.setState({ items });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      case "Stock":
        this.props.history.push("/products");
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
  };

  render() {
    const { items, pageSize, currentPage } = this.state;
    const recipes = paginate(items, currentPage, pageSize);

    return (
      <div className="offset container-fluid">
        <div className="row">
          <div className="col-3 mt-3 position-fixed">
            <SideBar
              items={this.state.sideBar}
              onSelect={this.onSelect}
              selected={this.state.sideBarR}
              qnty={items.length}
            />
          </div>
          <div className="col-8 offset-3">
            {this.state.isLoading && <Loading />}
            {!this.state.isLoading && (
              <div className="row  justify-content-center">
                {recipes.map(item => (
                  <ItemView
                    key={item._id}
                    src={item.image}
                    title={item.title}
                    id={item._id}
                    sourceUrl={item.sourceUrl.replace("https", "http")}
                    ingredientsList={item.ingredientsList}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className=" row justify-content-center">
          <Pagination
            itemsCount={items.length}
            pageSize={pageSize}
            onPageChange={this.onPageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}
