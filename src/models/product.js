import {Schema, model} from "mongoose";

const productSchema = new Schema({
  id: String,
  name: String,
  aisle: String,
  image: String,
  consitency: String,
  original: String,
  originalString: String,
  originalName: String,
  amount: Number,
  unit: String,
  meta: [String],
  measures: [{}]
});

const Product = new model('Product', productSchema);

export {Product};
