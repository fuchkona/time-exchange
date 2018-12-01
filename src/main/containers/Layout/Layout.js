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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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
                    Time&nbsp;Exchange
                </div>
                </div>
              </Link>
            </Col>
            <Col className="layout__filter pt-4" md="4">
              {this.props.filter}
            </Col>
            <Col md="2">
              <div className="layout__debug">
                <p>Отладочная инфа</p>
                <p>{this.props.debugScreenName}</p>
                <p>{this.props.debugAuthToken}</p>
              </div>
            </Col>
            <Col md="3 pt-2">
              <Link to="/create">
                <Button
                  className="m-1 px-1"
                  size="md"
                >
                  Создать задачу
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  className="m-1 px-1"
                  size="md"
                >
                  Профиль
                </Button>
              </Link>
              <Button
                className="m-1 px-1"
                size="md"
                onClick={this.handleSignOut}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
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
