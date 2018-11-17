import './Register.scss';

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


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFullname: '',
      userLogin: '',
      userPassword: '',
      userPasswordCheck: '',
      userEmail: '',
      userFullnameError: false,
      userLoginError: false,
      userPasswordError: false,
      userPasswordCheckError: false,
      userEmailError: false,
    };
  }

  handleRegister = () => {
    const { userLogin, userPassword } = this.state;
    if (userLogin === 'newuser' && userPassword === '4321') {
      this.setState({
        userFullnameError: false,
        userLoginError: false,
        userPasswordError: false,
        userPasswordCheckError: false,
        userEmailError: false,
        userFullname: '',
        userLogin: '',
        userPassword: '',
        userPasswordCheck: '',
        userEmail: '',
      });
      // редирект на Layout
    } else {
      this.setState({ userLoginError: true, userPasswordError: true });
      setTimeout(() => this.setState({
        userFullnameError: false,
        userLoginError: false,
        userPasswordError: false,
        userEmailError: false,
      }), 2000);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const className = 'login-screen__register';

    return (
      <div className={className}>
        <Modal autoFocus={false} centered isOpen={this.props.open} toggle={this.props.handleToggle} className={className}>
          <ModalBody>
            <div className="login-screen__register-form">
              <Form>
                <FormGroup>
                  <Label for="userFullname">Желаемое имя</Label>
                  <Input
                    id="userFullname" type="text" name="userFullname" placeholder="Введите имя" value={this.state.userFullname}
                    autoFocus
                    invalid={this.state.userFullnameError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Такое имя уже занято!</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="userLogin">Желаемый логин</Label>
                  <Input
                    id="userLogin" type="text" name="userLogin" placeholder="Введите логин" value={this.state.userLogin}
                    autoFocus
                    invalid={this.state.userLoginError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Такой логин уже занят!</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="userPassword">Пароль</Label>
                  <Input
                    id="userPassword" type="password" name="userPassword" placeholder="Введите пароль" value={this.state.userPassword}
                    invalid={this.state.userPasswordError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Слишком короткий пароль!</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="userPassword">Повторите пароль</Label>
                  <Input
                    id="userPasswordCheck" type="password" name="userPasswordCheck" placeholder="Повторите пароль" value={this.state.userPasswordCheck}
                    invalid={this.state.userPasswordCheckError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Пароли не совпадают!</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="userEmail">E-mail</Label>
                  <Input
                    id="userEmail" type="email" name="userEmail" placeholder="Введите ваш e-mail" value={this.state.userEmail}
                    autoFocus
                    invalid={this.state.userEmailError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Такой e-mail уже занят!</FormFeedback>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleRegister}>Регистрация</Button>
            <Button onClick={this.props.handleToggle}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}