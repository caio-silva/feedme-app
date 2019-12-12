import {Recipe} from '../models/recipe';
import {User} from '../models/user';
import {Stock} from '../models/stock';
import {errorHandler} from '../helpers/errorHandler';
import {saveToJsonFile} from '../helpers/fileWriter';
import _ from 'lodash';
import rp from 'request-promise';

export async function getAllRecipes(req, res){
  /*
  * getAllRecipes accessed via GET. it return a json object with all
  * data on recipes collection .
  * return {totalRecipes: number, recipes: [{recipes]}}
  */
    try{
      const recipes = await Recipe.find();
      if (!recipes) return res.send('No recipes found in database.');
      return res.send(_.assign({totalRecipes: recipes.length}, {recipes: [recipes]}));
    }
    catch(ex){
      errorHandler(ex, 'getRecipes');
    }
}

export async function getFilteredRecipes(req, res){
   /*
  * getFilteredRecipes accessed via GET. it return a json object with all
  * matching recipes based on User.settings. 
  * returns {totalRecipes: number, recipes: [{recipes]}}
  */
  try{
    //load settings from User
    let {settings} = await User.findById(req.user._id);
    const userSettings = _.pick(settings, ['vegetarian', 'vegan', 'glutenFree', 'dairyFree']);
    //load product in stock
    // const {products} = await Stock.findOne({userId: req.user._id}) ;
  
    //apply filters to search
    const recipes = await Recipe
    .find()
    .where(userSettings);
    if (!recipes) return res.send('No recipes found in database.');
    
    return res.send(_.assign({totalRecipes: recipes.length}, {recipes: [recipes]}));
  }
  catch(ex){
    errorHandler(ex, 'getFilteredRecipes');
  }
}

export async function getFilteredRecipesOption(req, res){
  try{
    
    const recipes = await Recipe
    .find()
    .where(req.body.options)
    .populate();
    if (!recipes) return res.send('No recipes found in database.');
    
    res.send(_.assign({totalRecipes: recipes.length}, {recipes: [recipes]}));
  }
  catch(ex){
      errorHandler(ex, 'getFilteredRecipesOption');
  }
}

export async function fetchRecipes(tag){
  let options = {
	  method: 'GET',
	  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
	  qs: {number: '99',  limitLicense: 'true', tags: `${tag}`},
	  headers: {
		'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		'x-rapidapi-key': process.env.RAPIDI_API_KEY
  },
  json: true
 };

  try{
	
    let results = await rp(options);
    results = results.recipes;
    saveToJsonFile(results);  
    for (let item of results){
      await addRecipe(item);
    }
  }
  catch(ex){
	  errorHandler(ex, 'fetchRecipes');
  }
}

export async function addRecipe(recipe){
  try{
    let found = await Recipe.findOne({id: recipe.id});
    if (found) return found;

    let newRecipes = new Recipe( 
      _.pick(
        recipe,
          [ 
            'vegetarian', 
            'vegan', 
            'glutenFree',
            'dairyFree',
            'veryHealthy',
            'cheap',
            'veryPopular',
            'sustainable',
            'weightWatcherSmartPoints',
            'preparationMinutes',
            'cookingMinutes',
            'lowFodmap',
            'ketogenic',
            'whole30',
            'sourceUrl',
            'spoonacularSourceUrl',
            'aggregateLikes',
            'spoonacularScore',
            'healthScore',
            'creditsText',
            'extendedIngredients',
            'license',
            'sourceName',
            'id',
            'title',
            'readyInMinutes',
            'servings',
            'image',
            'cuisines',
            'dishType',
            'diets',
            'winePairing',
            'instructions',
            'analyzedInstructions'
          ]
      )
    );
        
    return await newRecipes.save();
      
  }
  catch(ex){
    errorHandler(ex, 'addRecipe');
  }
}