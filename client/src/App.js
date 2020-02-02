import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import auth from './services/authService';
import NavBar from './components/navBar';
import Home from './components/home';
import Profile from './components/profile';
import Recipes from './components/recipes';
import Recipe from './components/recipe';
import Logout from './components/logout';
import Dashboard from './components/dashboard';
import NotFound from './components/notFound';
import ProtectedRoute from './components/common/protectedRoute';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route exact path="/home" component={Home} />
          <ProtectedRoute exact path="/logout" component={Logout} />
          <ProtectedRoute exact path="/recipes/:id" component={Recipe} />
          <ProtectedRoute exact path="/recipes" component={Recipes} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          {/* <ProtectedRoute exact path="/profile" render={(props) => <Profile user={this.state.user} {...props} />} /> */}
          <ProtectedRoute exact path="/profile" component={Profile} />} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect from="/" to="/home" />
          {/* <Redirect to="/not-found" /> */}
        </Switch>
      </React.Fragment>
    )
  }
}