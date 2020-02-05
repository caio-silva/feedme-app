import React, { Component } from "react";
import Pagination from "./common/pagination";
import Loading from "./common/loading";
import { paginate } from "../utils/paginate";
import product from "../services/productService";
import { toast } from "react-toastify";
import ProductCartView from "./common/productCartView";
import user from "../services/userService";
import ProductView from "./common/productView";

export default class Products extends Component {
  state = {
    items: [],
    itemsToShow: [],
    stock: [],
    pageSize: 100,
    currentPage: 1,
    isLoading: true,
    queryInput: ""
  };

  async componentDidMount() {
    try {
      const { data: items } = await product.getProducts();
      this.setState({ items });
      const {
        data: { products: stock }
      } = await user.getStock();
      this.setState({ stock });
      // console.log(stock);
      this.setState({ isLoading: false });
    } catch (ex) {
      toast.error("Sorry, there was an error.");
    }
  }

  onChange = ({ currentTarget: input }) => {
    this.setState({ queryInput: input.value });
    const { items, queryInput } = this.state;
    const itemsToShow = items.filter(item =>
      item.name.toLowerCase().startsWith(queryInput.toLowerCase())
    );
    this.setState({ itemsToShow });
  };

  onAddClick = async e => {
    try {
      await user.setStock({
        barcode: e,
        quantity: 1
      });

      const {
        data: { products: stock }
      } = await user.getStock();
      this.setState({ stock });
    } catch (error) {
      toast.error("Sorry, there was an error.");
    }
  };

  onMinusClick = async e => {
    try {
      await user.setStock({
        barcode: e,
        quantity: -1
      });

      const {
        data: { products: stock }
      } = await user.getStock();
      this.setState({ stock });
    } catch (error) {
      toast.error("Sorry, there was an error.");
    }
  };

  render() {
    const { items, itemsToShow, pageSize, currentPage, stock } = this.state;
    const products = paginate(itemsToShow, currentPage, pageSize);

    return (
      <div className="offset">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1>In stock</h1>
              {stock.length >= 1 &&
                stock.map(item => (
                  <ProductView
                    key={item.productId}
                    id={item.productId}
                    name={item.product_name}
                    qnty={item.quantity}
                    onMinusClick={this.onMinusClick}
                  />
                ))}
            </div>
            <div className="col yScroll">
              <h1>Products Available</h1>
              <form className="form-inline my-2 sticky-top ml-auto">
                <input
                  className="form-control col-9"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.onChange}
                />
              </form>
              {products.map(product => (
                <ProductCartView
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  onAddClick={this.onAddClick}
                  onMinusClick={this.onMinusClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
