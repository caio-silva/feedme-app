import { Product } from '../models/product';

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    return res.header(200).send(products);
  }
  catch (ex) {
    errorHandler(ex, 'getAllProducts');
  }
}