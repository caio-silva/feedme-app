import "@babel/polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { connectToDB } from './helpers/dbConnection';
import { config } from 'dotenv';
import usersApiRouter from './routes/user.api';
import settingsApiRouter from './routes/settings.api';
import stockApiRouter from './routes/stock.api';
import recipesApiRouter from './routes/recipes.api';

config();
connectToDB();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// //////////////////////////
app.use(express.static(path.resolve(__dirname, '../client/build')));
// //////////////////////

// api routes setup
app.use('/api/user', usersApiRouter);
app.use('/api/settings', settingsApiRouter);
app.use('/api/stock', stockApiRouter);
app.use('/api/recipes', recipesApiRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


if (process.env.NODE_ENV === 'production') {
  //set static folder
  // app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => { console.log(`Server running and listening on port ${PORT}`) })
//module.exports = app;