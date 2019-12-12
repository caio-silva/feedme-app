import {writeFile} from 'fs';
import {errorHandler} from './errorHandler';

export async function saveToJsonFile(data, name){
  let now = new Date();
  let fileName = `./json/${now.getDate()}${now.getMonth()}${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.json`;
  if (name != undefined) fileName = name;
  
  writeFile(fileName, JSON.stringify(data), function (ex) {
    if (ex) return errorHandler(ex, 'saveToJsonFile');
    console.log(`File saved: ${fileName}`);
  });
}

