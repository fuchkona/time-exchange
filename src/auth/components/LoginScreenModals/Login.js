import './Login.scss';

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


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: '',
      userPassword: '',
      userLoginError: false,
      userPasswordError: false,
    };
  }

  handleLogin = () => {
    const { userLogin, userPassword } = this.state;
    if (userLogin === 'user' && userPassword === '1234') {
      this.setState({
        userLoginError: false,
        userPasswordError: false,
        userLogin: '',
        userPassword: '',
      });
      // редирект на Layout
    } else {
      this.setState({ userLoginError: true, userPasswordError: true });
      setTimeout(() => this.setState({ userLoginError: false, userPasswordError: false }), 2000);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
                  <Label for="userLogin">Login</Label>
                  <Input
                    id="userLogin" type="text" name="userLogin" placeholder="Your login" value={this.state.userLogin}
                    autoFocus
                    invalid={this.state.userLoginError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>User name doesn't exist!</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="userPassword">Password</Label>
                  <Input
                    id="userPassword" type="password" name="userPassword" placeholder="Your password" value={this.state.userPassword}
                    invalid={this.state.userPasswordError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Wrong password!</FormFeedback>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleLogin}>Login</Button>
            <Button onClick={this.props.handleToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
