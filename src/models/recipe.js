import { Schema, model } from "mongoose";

const recipeSchema = new Schema ({
  ingredientsList: [String],
  vegetarian: Boolean,
  vegan: Boolean,
  glutenFree: Boolean,
  dairyFree: Boolean,
  veryHealthy: Boolean,
  cheap: Boolean,
  veryPopular: Boolean,
  sustainable: Boolean,
  weightWatcherSmartPoints: Number,
  preparationMinutes: Number,
  cookingMinutes: Number,
  lowFodmap: Boolean,
  ketogenic: Boolean,
  whole30: Boolean,
  sourceUrl: String,
  spoonacularSourceUrl: String, 
  aggregateLikes: Number,
  spoonacularScore: Number,
  healthScore: Number,
  creditsText: String,
  extendedIngredients: [{}],
  license: String,
  sourceName: String,
  id: Number,
  title: String,
  readyInMinutes: Number,
  servings: Number,
  image: String,
  cuisines: [String],
  dishType: [String],
  diets: [String],
  winePairing: [{}],
  instructions: String,
  analyzedInstructions: [{}]
});

const Recipe = new model(
  /* Recipes model */
  'Recipe', recipeSchema);

export {Recipe};
