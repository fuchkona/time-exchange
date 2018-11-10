import React, { Component } from 'react';
import {
  Button
} from "reactstrap";

import logo from './logo.svg';
import './App.scss';
import LoginScreen from './components/LoginScreen';

class App extends Component {
  render() {
    return (
      <div className="app">
        <LoginScreen />
      </div>
    );
  }
}

export default App;
