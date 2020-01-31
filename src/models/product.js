import { Schema, model } from "mongoose";

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
}, { database: 'feedme' });

const Product = new model(
  /* Product model */
  'Product', productSchema);

export { Product };
