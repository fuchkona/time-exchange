import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

import './Login.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: '',
      userPassword: '',
      rememberMe: false,
      userLoginError: false,
      userPasswordError: false,
    };
  }

  handleLogin = () => {
    const { userLogin, userPassword, rememberMe } = this.state;
    console.log(rememberMe);
    // НИЖЕ - Предварительная проверка на фронте
    // if (userLogin === 'user' && userPassword === '1234') {
    //   this.setState({
    //     userLoginError: false,
    //     userPasswordError: false,
    //     userLogin: '',
    //     userPassword: '',
    //   });
    //   this.props.handleLogin();
    // } else {
    //   this.setState({ userLoginError: true, userPasswordError: true });
    //   setTimeout(() => this.setState({ userLoginError: false, userPasswordError: false }), 2000);
    // }
    // ЕСЛИ ВСЕ ОК - то вызываем метод для работы с беком
    this.props.handleLogin(userLogin, userPassword, rememberMe);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleChangeCheckbox = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  }

  render() {
    const className = 'login';

    return (
      <div className={className}>
        <Modal autoFocus={false} centered isOpen={this.props.open} toggle={this.props.handleToggle} className={className}>
          <ModalBody>
            <div className="login-form">
              <Form>
                <FormGroup>
                  <Label for="userLogin">Логин</Label>
                  <Input
                    id="userLogin" type="text" name="userLogin" placeholder="Введите ваш логин (testuser/alfauser/betauser)" value={this.state.userLogin}
                    autoFocus
                    invalid={this.state.userLoginError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Такого логина не существует!</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="userPassword">Пароль</Label>
                  <Input
                    id="userPassword" type="password" name="userPassword" placeholder="Введите ваш пароль (test1234/alfa1234/beta1234)" value={this.state.userPassword}
                    invalid={this.state.userPasswordError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Неверный пароль!</FormFeedback>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="rememberMe" name="rememberMe" onChange={this.handleChangeCheckbox} />
                    Запомнить меня
                  </Label>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleLogin}>Вход</Button>
            <Button onClick={this.props.handleToggle}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
