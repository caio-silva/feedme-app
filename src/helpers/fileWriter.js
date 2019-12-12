import {writeFile} from 'fs';
import {errorHandler} from './errorHandler';

export async function saveToJsonFile(data, name){
  /*
  * saves data in json format in disk.
  * logs file name to console.  
  * dir/file name format: json/DDMMYYYY-HHMM.json
  */
  let now = new Date();
  let fileName = `./json/${now.getDate()}${now.getMonth()}${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}.json`;
  if (name != undefined) fileName = name;
  
  writeFile(fileName, JSON.stringify(data), function (ex) {
    if (ex) return errorHandler(ex, 'saveToJsonFile');
    console.log(`File saved: ${fileName}`);
  });
}

