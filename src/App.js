import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

import { QueryParamProvider } from 'use-query-params';

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
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
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
            component={(props) => {
              return this.props.auth.data.role_id === 1 ? (<Home {...props} />) : (<Redirect to="/order" />)
            }}
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
            component={(props) => {
              return this.props.auth.data.role_id === 1 ? (<Product {...props} />) : (<Redirect to="/order" />)
            }}
          />
          <PrivateRoute
            exact
            path="/user"
            component={(props) => {
              return this.props.auth.data.role_id === 1 ? (<User {...props} />) : (<Redirect to="/order" />)
            }}
          />
        </Switch>
        </QueryParamProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps)(App);
