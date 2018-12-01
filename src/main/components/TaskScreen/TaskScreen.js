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

import Layout from '../../containers/Layout/Layout';
import './TaskScreen.scss';

class TaskScreen extends Component {

  componentDidMount() {
    console.log('did mount');
    // this.props.fetchTasks(this.props.signIn.token);
  }

  render() {
    const { token } = this.props.signIn;
    const { id } = this.props.match.params;

    console.log('task id', id);

    return (
      <Layout
        debugScreenName="Экран одной задач"
        debugAuthToken={token}
      >
        <div className="task-screen">
          <h2>Задача с id: {id}</h2>
        </div>
      </Layout>
    );
  }
}

export default TaskScreen;