import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { fakeAuth } from './utils/fakeAuth';

export function PrivateRoute({ component: Component, ...rest }) {
  // const { auth } = { ...rest };
  // console.log(auth);
  return (
    <Route
      {...rest}
      render={props => 
        fakeAuth.isAuthenticated
          ? (
            <Component {...props} />
          )
          : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}