import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...options }) => {
  const auth = useSelector(state => state.auth);
  const token = auth.data && auth.data.token ? auth.data.token : undefined;
  
  return (
    <Route
      {...options}
      render={
        props => {
          if(token) {
            return (<Component {...props} />)
          } else {
            return (<Redirect to="/login" />)
          }
        }
      }
    />
  )
};

export default PrivateRoute;
