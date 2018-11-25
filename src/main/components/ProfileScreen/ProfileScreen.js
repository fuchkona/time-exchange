import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";

import './ProfileScreen.scss';
const logo = require('../../../static/time-exchange-logo.png');

class ProfileScreen extends Component {
  handleSignOut = () => {
    this.props.signOut();
  };

  render() {
    const { token } = this.props.signIn;

    return (
      <div className="profile-screen">
        <Container fluid>
          <Row className="m-5">
            <Col md="12">
              <div className="profile-screen__logo">
                <img src={logo} alt="logo" />
                <h1>PROFILE SCREEN</h1>
              </div>
              <div>
                <h2>Auth token: {token}</h2>
              </div>
              <div>
                <Link to="/">
                  <Button
                    className="m-2 px-4"
                    size="lg"
                  >
                    Go to TASKS Screen
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button
                    className="m-2 px-4"
                    size="lg"
                  >
                    Go to PROFILE Screen
                  </Button>
                </Link>
              </div>
              <Button
                className="m-2 px-4"
                size="lg"
                onClick={this.handleSignOut}
              >
                SIGNOUT
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProfileScreen;