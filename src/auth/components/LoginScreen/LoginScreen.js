import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import './LoginScreen.scss';
import Login from './LoginScreenModals/Login';
import Register from './LoginScreenModals/Register';
const logo = require('../../../static/time-exchange-logo.png');

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalLoginOpen: false,
      modalRegisterOpen: false,
    };
  }

  handleLoginToggle = () => {
    if (this.state.modalRegisterOpen) {
      this.setState({
        modalLoginOpen: !this.state.modalLoginOpen,
        modalRegisterOpen: false,
      });
    } else {
      this.setState({
        modalLoginOpen: !this.state.modalLoginOpen,
      });
    }
  };

  handleRegisterToggle = () => {
    if (this.state.modalLoginOpen) {
      this.setState({
        modalRegisterOpen: !this.state.modalRegisterOpen,
        modalLoginOpen: false,
      });
    } else {
      this.setState({
        modalRegisterOpen: !this.state.modalRegisterOpen,
      });
    }
  };

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
            <Col md="4"></Col>
            <Col md="4">
              <div className="login-screen__form">
                <Login
                  open={this.state.modalLoginOpen}
                  handleToggle={this.handleLoginToggle}
                />
                <Register
                  open={this.state.modalRegisterOpen}
                  handleToggle={this.handleRegisterToggle}
                />
              </div>
              <div className="login-screen__buttons">
                <Button
                  className="m-2 px-4 login-screen__buttons_login"
                  size="lg"
                  onClick={this.handleLoginToggle}
                >
                  Вход
                </Button>
                <Button
                  className="m-2 px-4 login-screen__buttons_register"
                  size="lg"
                  onClick={this.handleRegisterToggle}
                >
                  Регистрация
                </Button>
              </div>
            </Col>
            <Col md="4"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginScreen;