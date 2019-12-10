import {connectToDB} from './helpers/dbConnection';
import {getAll} from './controllers/recipes';
import {config} from 'dotenv';
import _ from 'lodash';
import { saveToJsonFile } from './helpers/fileWriter';
config();

async function getAllProducts(){
  await connectToDB();
  const recipes = await getAll();
  let products = new Set;

  for (let i = 0; i < recipes.length; i++){
    let ingredients = recipes[i].extendedIngredients;
    for (let ing of ingredients){
        products.add( _.pick(ing,['name','id']) );
    }
  }
  saveToJsonFile(Array.from(products), './json/products.json');
  // console.log(Array.from(products));
}

getAllProducts();