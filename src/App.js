import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import './App.scss';
import './rxjs';

import { rootReducer, rootEpic } from './redux';

import LoginScreen from './auth/components/LoginScreen';

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
        <div className="app">
          <LoginScreen />
        </div>
      </Provider>
    );
  }
}

export default App;
