import { Product } from '../models/product';
import { Stock } from '../models/stock';
import { errorHandler } from '../helpers/errorHandler';

export async function createStock(id) {
  try {
    const stock = new Stock({ userId: id });
    await stock.save();
  } catch (ex) {
    errorHandler(ex, 'createStock');
  }
}

export async function addToStock(req, res) {
  try {
    const quantityToAdd = parseInt(req.body.quantity || 1);
    let stock = await Stock.findOne({ userId: req.user._id });

    const productToAdd = await Product.findOne({ id: req.body.barcode });
    if (!productToAdd) return res.send(stock);

    let found = false;
    for (let product of stock.products) {
      if (product.productId.toString() === productToAdd.id.toString()) {
        product.quantity += quantityToAdd;
        found = true;
      }
      if (found) break;
    }


    if (!found) {
      stock.products.push({
        product_name: productToAdd.name,
        quantity: quantityToAdd,
        product_Id: productToAdd._id,
        productId: productToAdd.id,
      });
    }
    await stock.save();
    return res.send({ stock });
  }
  catch (ex) {
    errorHandler(ex, 'addToStock');
  }
}

export async function getStock(req, res) {
  try {
    const stock = await Stock.findOne({ userId: req.user._id });
    return res.send(stock);
  }
  catch (ex) {
    errorHandler(ex, 'getStock');
  }
}