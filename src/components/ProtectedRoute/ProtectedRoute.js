import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuth } from '../../utils/checkAuth';
import { types } from '../../actions/types';

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  logout,
  user,
  ...rest
}) => {
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) => {
          console.log('CHecking Auth in Route');
          let auth = checkAuth();

          if (!auth) {
            logout();
          }
          return auth && user.role === 'admin' ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to='/' />
          );
        }}
      ></Route>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticate,
  user: state.auth.user
});

const mapDisptachToProps = (dispatch) => ({
  logout: () =>
    dispatch({
      type: types.LOGOUT_USER
    })
});
export default connect(mapStateToProps, mapDisptachToProps)(ProtectedRoute);
