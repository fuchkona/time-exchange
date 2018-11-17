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

import './TasksScreen.scss';
const logo = require('../../../static/time-exchange-logo.png');

class TasksScreen extends Component {
  render() {
    return (
      <div className="tasks-screen">
        <Container fluid>
          <Row className="m-5">
            <Col md="12">
              <div className="tasks-screen__logo">
                <img src={logo} alt="logo" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TasksScreen;