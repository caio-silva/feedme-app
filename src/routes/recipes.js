import express from 'express';
import auth from '../middleware/auth';
import {getAllRecipes, getFilteredRecipes, getFilteredRecipesOption} from '../controllers/recipes';
let router = express.Router();

router.get('/all', auth, getAllRecipes);
router.get('/filtered', auth, getFilteredRecipes);
router.get('/filteredoptions', auth, getFilteredRecipesOption);


module.exports = router;