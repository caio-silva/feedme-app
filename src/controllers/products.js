import {Product} from '../models/product';
import {errorHandler} from '../helpers/errorHandler'
import rp from 'request-promise';
import _ from 'lodash'

async function addProduct(barcode){
  try{

    let product = await Product.findOne({barcode_number: barcode});
    if (product) return product;

    // call api to get product details
    // let options = {
    //   method: 'GET',
    //   url: 'https://barcode-lookup.p.rapidapi.com/v2/products',
    //   qs: {barcode: `${barcode.toString()}`},
    //   headers: {
    //     'x-rapidapi-host': 'barcode-lookup.p.rapidapi.com',
    //     'x-rapidapi-key': process.env.RAPIDI_API_KEY
    //   },
    //   json: true
    // };

    // const response = await rp(options);
    // if (response){
    //   product = new Product(_.pick(response.products, ['barcode_number:', 'barcode_type', 'barcode_formats']));
    //   return await product.save();
    // }
    else return 'Product not found';
    
  }
  catch(ex){
    errorHandler(ex, 'addProduct');
  }
}

export {addProduct};