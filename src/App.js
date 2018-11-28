import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import './App.scss';
import './rxjs';

import { rootReducer, rootEpic } from './redux';
import PrivateRoute from './PrivateRoute';
import LoginScreen from './auth/containers/LoginScreen';
import TasksScreen from './main/containers/TasksScreen';
import ProfileScreen from './profile/containers/ProfileScreen';
import cookie from 'react-cookie';
import { verifyUsernamePasswordSuccess } from './auth/actions';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
    ),
  ),
);

epicMiddleware.run(rootEpic);

class App extends Component {
  constructor(props) {
    super(props);
    const cookieToken = cookie.load('time-exchange-token');
    if (cookieToken) {
      store.dispatch(verifyUsernamePasswordSuccess(cookieToken)); // не факт что верное решение
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute path="/" exact component={TasksScreen} />
            <PrivateRoute path="/profile" exact component={ProfileScreen} />
            <Route path="/login" component={LoginScreen} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
