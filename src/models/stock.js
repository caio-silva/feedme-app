import {Schema, model} from "mongoose";
import {User} from '../models/user';
import {Product} from '../models/product';

const stockSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
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

const Stock = new model('Stock', stockSchema);

export {Stock};