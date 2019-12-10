import {Recipe} from '../models/recipe';
import { errorHandler} from '../helpers/errorHandler';
import _ from 'lodash';

export async function getAllRecipes(req, res){
    try{
        const recipes = await Recipe.find();
        if (!recipes) return res.send('No recipes found in database.');
        res.send(recipes);
    }
    catch(ex){
        errorHandler(ex, 'getRecipes');
    }
}

export async function getFilteredRecipes(req, res){
    try{

        const query = _.pick(req.query, ['vegetarian', 'vegan', 'glutenFree', 'dairyFree']);
        const recipes = await Recipe
        .find()
        .where(query);
        if (!recipes) return res.send('No recipes found in database.');
        
        res.send(_.assign({total: recipes.length}, {recipes: [recipes]}));
    }
    catch(ex){
        errorHandler(ex, 'getRecipes');
    }
}