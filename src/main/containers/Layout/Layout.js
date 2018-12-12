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
import { createTask, createTaskModalToggle } from '../../actions';
import CreateTask from './LayoutModals/CreateTask';
import WaitingModal from '../../../global/components/WaitingModal/WaitingModal';
import './Layout.scss';
const logo = require('../../../static/time-exchange-logo.png');

class Layout extends Component {
  static defaultProps = {
    debugScreenName: '',
    debugAuthToken: '',
  };

  handleCreateTask = (title, description, deadline) => {
    const taskDetails = {
      title,
      description,
      deadline,
      userId: this.props.signIn.id,
    };

    console.log('create task click', taskDetails);
    this.props.createTask(this.props.signIn.token, taskDetails);
  }

  handleCreateTaskToggle = () => {
    this.props.createTaskModalToggle();
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
              <div className="layout__create-task-form">
                <CreateTask
                  open={this.props.tasks.modalCreateTaskOpen}
                  handleToggle={this.handleCreateTaskToggle}
                  handleCreateTask={this.handleCreateTask}
                />
              </div>
              <Button
                className="m-1 px-1"
                size="md"
                onClick={this.handleCreateTaskToggle}
              >
                Создать задачу
              </Button>
              <Link to="/profile">
                <Button
                  className="m-1 px-1"
                  size="md"
                >
                  {this.props.signIn.username}
                </Button>
              </Link>
              <WaitingModal
                open={this.props.signIn ? this.props.signIn.signingOut : false}
              />
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
    ...state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signOut,
      createTask,
      createTaskModalToggle,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
