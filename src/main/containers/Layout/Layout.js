import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

import { signOut } from '../../../auth/actions';
import './Layout.scss';
const logo = require('../../../static/time-exchange-logo.png');

class Layout extends Component {
  static defaultProps = {
    debugScreenName: '',
    debugAuthToken: '',
  };

  handleSignOut = () => {
    this.props.signOut(this.props.signIn.token);
  };

  render() {
    return (
      <div className="layout">
        <Container fluid>
          <Row className="layout__header m-0" justify="between">
            <Col md="3">
              <Link className="layout__logo" to="/">
                <div className="layout__logo_details">
                  <img src={logo} alt="logo" />
                  <div>
                    Time Exchange
                </div>
                </div>
              </Link>
            </Col>
            <Col md="4">
            </Col>
            <Col md="2">
              <div className="layout__debug">
                <p>Отладочная инфа</p>
                <p>{this.props.debugScreenName}</p>
                <p>{this.props.debugAuthToken}</p>
              </div>
            </Col>
            <Col md="3">

              <Link to="/profile/1">
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

function mapStateToProps(state) {
  return {
    ...state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signOut,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
