import {Schema, model} from "mongoose";
import {User} from '../models/user';
import {Product} from '../models/product';

const stockSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product_name: String,
        quantity: Number,
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        created: { 
            type: Date, 
            default: Date.now 
          }
    }]
});

stockSchema.methods.getIng = function(){

}

const Stock = new model(
    /* Stock model */
    'Stock', stockSchema);

export {Stock};