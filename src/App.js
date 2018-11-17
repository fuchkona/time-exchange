import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import './App.scss';
import './rxjs';

import { rootReducer, rootEpic } from './redux';
import { PrivateRoute } from './PrivateRoute';
import LoginScreen from './auth/components/LoginScreen/LoginScreen';
import TasksScreen from './main/components/TasksScreen/TasksScreen';
import ProfileScreen from './main/components/ProfileScreen/ProfileScreen';

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
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <PrivateRoute path="/" exact component={TasksScreen} />
            <PrivateRoute path="/profile" exact component={ProfileScreen} />
            <Route path="/login" component={LoginScreen} />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
