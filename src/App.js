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
import TaskScreen from './main/containers/TaskScreen';
import ProfileScreen from './profile/containers/ProfileScreen';
import Error404 from "./errors/components/Error404/Error404";
import moment from 'moment';
import 'moment/locale/ru';
import UserScreen from "./profile/components/UserScreen/UserScreen";


moment().locale('ru');
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
          <Switch>
            <PrivateRoute path="/" exact component={TasksScreen} />
            <PrivateRoute path="/task/:id" exact component={TaskScreen} />
            <PrivateRoute path="/profile" exact component={ProfileScreen} />
            <PrivateRoute path="/user/:id" exact component={UserScreen}/>
            <Route path="/login" component={LoginScreen} />
            <Route path="*" component={ Error404 }/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
