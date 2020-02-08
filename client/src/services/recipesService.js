import http from './httpServices';


export function getRecipeById(id) {
  const endPoint = `/api/recipes/${id}`
  return http.get(endPoint);
}

export function getAllRecipes() {
  const endPoint = '/api/recipes/all';
  return http.get(endPoint);
}

export function getFilteredRecipes() {
  const endPoint = '/api/recipes/filtered';
  return http.get(endPoint);
}

export function getRecipesWithSettings() {
  const endPoint = '/api/recipes/getRecipesWithSettings';
  return http.get(endPoint);
}

export default {
  getRecipeById,
  getAllRecipes,
  getFilteredRecipes,
  getRecipesWithSettings
} 