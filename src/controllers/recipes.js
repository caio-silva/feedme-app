import { Recipe } from '../models/recipe';
import { User } from '../models/user';
import { Stock } from '../models/stock';
import { errorHandler } from '../helpers/errorHandler';
import { saveToJsonFile } from '../helpers/fileWriter';
import _ from 'lodash';
import rp from 'request-promise';
import { Product } from '../models/product';

export async function getAllRecipes(req, res) {
  /*
  * getAllRecipes accessed via GET. returns a json object with all
  * data in recipes collection.
  * 
  */
  try {
    const recipes = await Recipe.find({});
    if (!recipes) return res.json({ totalRecipes: 0, recipes: [] });
    return res.header(200).send(recipes);
    // return res.header(200).send([recipes[0], recipes[1]]);
  }
  catch (ex) {
    errorHandler(ex, 'getAllRecipes');
  }
}

export async function getFilteredRecipes(req, res) {
  /*
  * getFilteredRecipes accessed via GET. it returns a json object with all
  * matching recipes based on User.settings and in Stock products
  * 
  * @returns {totalRecipes: number, recipes: [recipes]}
  * 
  */
  try {
    const { settings } = await User.findById(req.user._id);
    const { _id, ...userSettings } = settings._doc;
    const stock = await Stock.findOne({ userId: req.user._id });
    if (!stock) return res.json({ msg: 'No products in stock', totalRecipes: 0, recipes: [] });

    let prodInStockList = [];
    stock.products.forEach(product => {
      prodInStockList.push(product.product_name);
    });

    let recipes = await
      Recipe
        .find({ $expr: { $setIsSubset: ["$ingredientsList", prodInStockList] } }, { _id: 0 })
        .where(userSettings);

    if (!recipes) return res.json({ totalRecipes: 0, recipes: [] });
    return res.json({ totalRecipes: recipes.length, recipes: recipes });
  }
  catch (ex) {
    errorHandler(ex, 'getFilteredRecipes');
  }
}

export async function queryWithOption(req, res) {
  /*
  *                  TO BE FINISHED
  *
  * queryWithOption accessed via POST. 
  * It returns a json object with all matching recipes based on 
  * User.settings and in Stock products
  * 
  * @returns {totalRecipes: number, recipes: [{recipes]}}
  * 
  */
  try {
    const recipes = await Recipe
      .find()
      .where()
      .populate();

    if (!recipes) return res.json({ totalRecipes: 0, recipes: [] });

    return res.json({ totalRecipes: recipes.length, recipes: [recipes] });
  }
  catch (ex) {
    errorHandler(ex, 'getFilteredRecipesOption');
  }
}

export async function getRecipesWithSettings(req, res) {
  try {
    const { settings } = await User.findById(req.user._id);
    const { _id, ...userSettings } = settings._doc;

    let recipes = await
      Recipe
        .find()
        .where(userSettings);

    return res.send(recipes);
  }
  catch (ex) {
    errorHandler(ex, 'getRecipesWithSettings');
  }
}

export async function fetchRecipes(tag) {
  /* 
  * query external api in search of recipes with
  * the given tag, if any found  they are added
  * to db and to a json file in json/DDMMYYYY-HHMM.json
  * 
  * @return {tag: tag, addedList: [addedList], resultList: [resultList] }
  */
  let options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    qs: { number: '99', limitLicense: 'true', tags: `${tag}` },
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDI_API_KEY
    },
    json: true
  };

  try {
    let results = await rp(options);
    results = results.recipes;

    // just for dev
    saveToJsonFile(results);

    let resultList = [];
    let addedList = [];
    let result;

    for (let item of results) {
      result = await addRecipe(item);
      if (result != -1) addedList.push({ title: item.title, id: item.id });
      resultList.push({ title: item.title, id: item.id });
    }
    return ({ tag: tag, addedList: addedList, resultList: resultList });
  }
  catch (ex) {
    errorHandler(ex, 'fetchRecipes');
  }
}

export async function addRecipe(recipe) {
  /*
  * adds recipes to db if it doesnt exists.
  * uses {id: recipe.id} to find recipe in database
  */
  try {
    let found = await Recipe.findOne({ id: recipe.id });
    if (found) return -1;

    let newRecipe = new Recipe(
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

    return await newRecipe.save();

  }
  catch (ex) {
    errorHandler(ex, 'addRecipe');
  }
}