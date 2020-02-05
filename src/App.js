import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Order from './pages/Order';
import Product from './pages/Product';
import User from './pages/User';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={
              (props) => (<Login {...props} />)
            }
          />
          <PrivateRoute
            exact
            path="/"
            component={
              (props) => (<Home {...props} />)
            }
          />
          <PrivateRoute
            exact
            path="/order"
            component={
              (props) => (<Order {...props} />)
            }
          />
          <PrivateRoute
            exact
            path="/product"
            component={
              (props) => (<Product {...props} />)
            }
          />
          <PrivateRoute
            exact
            path="/user"
            component={
              (props) => (<User {...props} />)
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps)(App);
