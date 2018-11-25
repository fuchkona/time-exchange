import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

import './Layout.scss';
const logo = require('../static/time-exchange-logo.png');

class Layout extends Component {
  static defaultProps = {
    debugScreenName: '',
    debugAuthToken: '',
  };

  handleSignOut = () => {
    // this.props.signOut(this.props.signIn.token);
  };

  render() {
    return (
      <div className="layout">
        <Container fluid>
          <Row className="layout__header m-0" justify="between">
            <Col md="3">
              <div className="layout__logo">
                <img src={logo} alt="logo" />
                <div className="layout__logo_title">
                  Time Exchange
                </div>
              </div>
            </Col>
            <Col md="4">
            </Col>
            <Col md="2">
              <div className="layout__debug">
                <p>{this.props.debugScreenName}</p>
                <p>{this.props.debugAuthToken}</p>
              </div>
            </Col>
            <Col md="3">
              
              <Link to="/profile">
                <Button
                  className="m-2 px-4"
                  size="lg"
                >
                  Профиль
                </Button>
              </Link>
              <Button
                className="m-2 px-4"
                size="lg"
                onClick={this.handleSignOut}
              >
                ВЫХОД
              </Button>
            </Col>
          </Row>
          <Row>
            {this.props.children}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Layout;