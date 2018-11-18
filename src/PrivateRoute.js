import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import { fakeAuth } from './utils/fakeAuth';

class PrivateRoute extends Component {
  render() {
    const { component: Component, signIn, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          (signIn.auth)
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
}

function mapStateToProps(state) {
  return {
    ...state.auth,
  };
}

export default connect(mapStateToProps, null)(PrivateRoute);
