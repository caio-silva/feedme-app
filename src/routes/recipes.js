import express from 'express';
import {getRecipes} from '../controllers/recipes';
let router = express.Router();

router.get('/', getRecipes);


module.exports = router;