import {Schema, model} from "mongoose";

const productSchema = new Schema({
  product_name: String,
  product_code: String,
  quantity: String,
  ingredients: [String],
  tags: [String],
  countries: [String],
  stores: [String],
  brands: [String],
  categories: [String]
});

const Product = new model('Product', productSchema);

export {Product};
