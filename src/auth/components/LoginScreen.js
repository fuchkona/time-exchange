import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

import './LoginScreen.scss';
const logo = require('../../static/time-exchange-logo.png');

class LoginScreen extends Component {
  render() {
    return (
      <div className="login-screen">
        <Container>
          <Row className="m-5">
            <Col md="12">
            <div className="login-screen__logo">
              <img src={logo} alt="logo" />
            </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="login-screen__buttons">
                <Button className="m-2 px-4 login-screen__buttons_login" size="lg">Вход</Button>
                <Button className="m-2 px-4 login-screen__buttons_register" size="lg">Регистрация</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginScreen;