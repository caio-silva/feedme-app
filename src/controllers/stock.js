import {Product} from '../models/product';
import {Stock} from '../models/stock';
import {errorHandler} from '../helpers/errorHandler';

export async function addToStock(req, res){
  try{
    
    const quantityToAdd = parseInt(req.body.quantity || 1);
    let stock = await Stock.findOne({userId: req.user._id});
    if (!stock) stock = new Stock ({userId: req.user._id});

    const productToAdd = await Product.findOne({id: req.body.barcode});
    if (!productToAdd) return res.send('No product found');
    let found = false;
    for (let product of stock.products){
      if (product.productId.toString() ===  productToAdd._id.toString()){
        product.quantity += quantityToAdd;
        found = true;
      }
      if (found) break;
    }
    

    if(!found){
      stock.products.push({
        product_name: productToAdd.name,
        quantity: quantityToAdd,
        product_id: productToAdd.id,
        productId: productToAdd._id
      });
    }
    await stock.save();
    // change renponse to something else
    return res.send(stock.products);
  }
  catch(ex){
    errorHandler(ex, 'addToStock');
  }
}

export async function getStock(req, res){
  try{
    
    const stock = await Stock.findOne({userId: req.user._id});
    if (!stock) return res.send({products: ''});
    return res.send(stock);
  }
  catch(ex){
    errorHandler(ex, 'getStock');
  }  
}