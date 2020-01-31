import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
// import * as Sentry from '@sentry/browser';

// Sentry.init({ dsn: "https://235815d91db5497383c660f86c7136ec@sentry.io/1884170" });

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
