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

import './TasksScreen.scss';
const logo = require('../../../static/time-exchange-logo.png');

class TasksScreen extends Component {
  handleSignOut = () => {
    this.props.signOut(this.props.signIn.token);
  };

  render() {
    const { token } = this.props.signIn;

    return (
      <div className="tasks-screen">
        <Container fluid>
          <Row className="m-5">
            <Col md="12">
              <div className="tasks-screen__logo">
                <img src={logo} alt="logo" />
                <h1>TASKS SCREEN</h1>
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

export default TasksScreen;