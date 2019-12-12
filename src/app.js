require("@babel/polyfill");
import createError from 'http-errors';
import express from 'express'; 
import path from 'path';
import {connectToDB} from './helpers/dbConnection';
import {config} from 'dotenv';
import usersRouter from'./routes/user';
import settingsRouter from './routes/settings';
import stockRouter from'./routes/stock';
import recipesRouter from './routes/recipes';

config();
connectToDB();

const app = express();

const PORT = process.env.PORT || 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/user', usersRouter);
app.use('/settings', settingsRouter);
app.use('/stock', stockRouter);
app.use('/recipes', recipesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => console.log(`Server running and listening on port ${PORT}`))
//module.exports = app;
