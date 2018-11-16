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
      userEmail: '',
      userLoginError: false,
      userPasswordError: false,
    };
  }

  handleRegister = () => {
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
    const className = 'register';

    return (
      <div className={className}>
        <Modal autoFocus={false} centered isOpen={this.props.open} toggle={this.props.handleToggle} className={className}>
          <ModalBody>
            <div className="login-form">
              <Form>
                <FormGroup>
                  <Label for="userFullname">Fullname</Label>
                  <Input
                    id="userFullname" type="text" name="userFullname" placeholder="Your fullname" value={this.state.userFullname}
                    autoFocus
                    invalid={this.state.userLoginError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>User name doesn't exist!</FormFeedback>
                </FormGroup>
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
                <FormGroup>
                  <Label for="userEmail">Email</Label>
                  <Input
                    id="userEmail" type="email" name="userEmail" placeholder="Your email" value={this.state.userEmail}
                    autoFocus
                    invalid={this.state.userLoginError}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>User name doesn't exist!</FormFeedback>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleRegister}>Register</Button>
            <Button onClick={this.props.handleToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}