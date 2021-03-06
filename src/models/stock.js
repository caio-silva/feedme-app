import { Schema, model } from "mongoose";
import { User } from '../models/user';
import { Product } from '../models/product';

const stockSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product_name: String,
        quantity: Number,
        productId: String,
        product_Id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        created: {
            type: Date,
            default: Date.now
        }
    }]
}, { database: 'feedme' });

const Stock = new model(
    /* Stock model */
    'Stock', stockSchema);

export { Stock };