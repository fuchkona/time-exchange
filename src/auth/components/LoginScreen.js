import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";

import './LoginScreen.scss';
const logo = require('../../static/time-exchange-logo.png');

class LoginScreen extends Component {
  render() {
    return (
      <div className="login-screen">
        <Container>
          <Row className="m-5">
            <Col md="3"></Col>
            <Col md="6">
              <Card body inverse className="login-screen__title-card text-center">
                <CardTitle>
                  Добро пожаловать в систему обмена временем
                </CardTitle>
              </Card>
            </Col>
            <Col md="3"></Col>
          </Row>
          <Row className="m-5">
            <Col md="12">
            <div className="login-screen__logo">
              <img src={logo} alt="logo" />
            </div>
            </Col>
          </Row>
          <Row className="m-5">
            <Col md="3"></Col>
            <Col md="6">
              <Card body inverse className="login-screen__info-card text-center">
                <CardText>
                  Здесь вы можете заказать выполнение нужной вам задачи совершенно бесплатно, достаточно просто выполнить понравившуюся вам задачу другого человека!
                </CardText>
              </Card>
            </Col>
            <Col md="3"></Col>
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