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
    sideBar: ["All recipes", "Cook now", "Stock"]
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

  onSelect = e => {
    console.log(e);
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
              <Badge text={"Total Recipes"} qnty={items.length} />
            )}
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
            </div>
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
