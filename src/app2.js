
import {config} from 'dotenv';
import { connectToDB } from './helpers/dbConnection';
import rp from 'request-promise';
import {addRecipes, getAll} from './controllers/recipes'
import { saveToJsonFile } from './helpers/fileWriter'

config();

let code = 5053990138753;
// const options = {
//   method: 'GET',
//   url : `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/upc/${code}`,
//   // url : 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
//   // qs: {number: '100', limitLicense: 'true', tags: 'main course%2C french' },
//   headers: {
//     'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
//     'x-rapidapi-key': process.env.RAPIDI_API_KEY 
//   },
//   json: true
// };

async function p(barcode){

  const options = {
    method: 'GET',
    url : `https://api.barcodelookup.com/v2/products?barcode=${barcode}&formatted=y&key=${process.env.BARCODE_API_KEY}`,
    headers: { 'Accept': 'application/json'},
    json: true
  }
  const r = await rp(options);
  saveToJsonFile(r);
  console.log(r);
  return await r;
}

// p(code);


async function run(options){
  await connectToDB();

  let results = await rp(options);
  results = results.recipes;
  const recipes = await addRecipes(results);
  const fileName = saveToJsonFile(results);
}

// run(options);

async function t (){
  let a =[];
  await connectToDB();
  const all = await getAll();
  saveToJsonFile(all);

  for(let i=0; i < all.length-1; i++){
    for(let j=i+1; j< all.length;j++){
      if(all[i].id==all[j].id){
        // await deleteByID(all[j].id)
        console.log(`repeated ${all[i].id}  ${i}  ${j}`);
        a.push(all[i].id);
      } 
    }
  }
  console.log(`size : ${a.length}`)
}
// t();