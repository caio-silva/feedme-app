import express from 'express';
import auth from '../middleware/auth';
import { getAllRecipes, getFilteredRecipes, getRecipesWithSettings, queryWithOption } from '../controllers/recipes';
let router = express.Router();

router.get('/all', auth, getAllRecipes);
router.get('/getRecipesWithSettings', auth, getRecipesWithSettings);
router.get('/filtered', auth, getFilteredRecipes);
router.get('/filteredoptions', auth, queryWithOption);


module.exports = router;