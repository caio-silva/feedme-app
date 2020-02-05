import express from 'express';
import auth from '../middleware/auth'
import { addToStock, getStock } from '../controllers/stock';
let router = express.Router();

router.get('/', auth, getStock);
router.post('/', auth, addToStock);


module.exports = router;