import ItemView from "./common/itemView";
import React, { Component } from "react";
import recipes from "../services/recipesService";
import Pagination from "./common/pagination";
import Badge from "./common/badge";
import Loading from "./common/loading";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { SideBar } from "./sideBar";

export default class Recipes extends Component {
  state = {
    items: [],
    pageSize: 12,
    currentPage: 1,
    loading: true,
    sideBar: ["All recipes", "Filtered recipes", "Cook now", "Stock"]
  };

  async componentDidMount() {
    let { loading } = this.state;
    try {
      const { data: items } = await recipes.getRecipesWithSettings();
      loading = false;
      this.setState({ loading });
      this.setState({ items });
    } catch (ex) {
      toast.error("Sorry, there was an error.");
    }
  }

  shouldComponentUpdate() {
    console.log("object shouldComponentUpdate ");
    return true;
  }

  onSelect = async e => {
    this.setState({ items: [] });
    let { loading } = this.state;
    loading = true;
    console.warn("loading", loading);
    this.setState({ loading });
    switch (e) {
      case "All recipes":
        try {
          const { data: items } = await recipes.getAllRecipes();
          loading = false;
          console.warn("loading 2", loading);
          this.setState({ loading });
          this.setState({ items });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      case "Filtered recipes":
        try {
          const { data: items } = await recipes.getRecipesWithSettings();
          loading = false;
          this.setState({ loading });
          this.setState({ items });
        } catch (ex) {
          toast.error("Sorry, there was an error.");
        }
        break;

      // case "Cook now":
      //   try {
      //     const { data: items } = await recipes.getRecipesWithSettings();
      //     loading = false;
      //     this.setState({ loading });
      //     this.setState({ items });
      //   } catch (ex) {
      //     toast.error("Sorry, there was an error.");
      //   }
      //   break;

      // case "Stock":
      // try {
      //   const { data: items } = await recipes.getRecipesWithSettings();
      //   loading = false;
      //   this.setState({ loading });
      //   this.setState({ items });
      // } catch (ex) {
      //   toast.error("Sorry, there was an error.");
      // }
      // break;

      default:
        break;
    }
  };

  onPageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { items, pageSize, currentPage } = this.state;
    const recipes = paginate(items, currentPage, pageSize);

    return (
      <div className="offset container">
        <div className="row">
          <div className="col-2 mt-3 position-fixed">
            <SideBar items={this.state.sideBar} onSelect={this.onSelect} />
          </div>
          <div className="col offset-2">
            {this.state.loading && <Loading />}
            {!this.state.loading && (
              <div className="row mt-2 justify-content-center">
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
                <Badge text={"Total Recipes"} qnty={items.length} />
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
