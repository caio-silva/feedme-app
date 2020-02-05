import express from 'express';
import auth from '../middleware/auth'
import { getAllProducts } from '../controllers/products';
let router = express.Router();

router.get('/', auth, getAllProducts);

module.exports = router;