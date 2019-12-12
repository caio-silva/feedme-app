import {connect, connection} from 'mongoose';
import { errorHandler } from './errorHandler';

export async function connectToDB(){
    /*
    * connects to db. Resposible for connection.  
    */

  const url = process.env.DB_URL;
  const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

  console.log(`Connecting to db..`);

  connection.on('connected', () => {console.log('Connection Established')});
  connection.on('reconnected', () => {console.log('Connection Reestablished')});
  connection.on('disconnected', () => {console.log('Connection Disconnected')});
  connection.on('close', () => {console.log('Connection Closed')});
  connection.on('error', (error) => {console.log('ERROR: ' + error)});

  try{
    await connect(url, options);
  }
  catch (ex) { 
    errorHandler(ex, 'connectToDB');  
  }

}
