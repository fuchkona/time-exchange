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
import moment from 'moment';

import Layout from '../../containers/Layout/Layout';
import './NewTaskScreen.scss';

class NewTaskScreen extends Component {

  handleCreateTask = () => {
    console.log('create task - click');
  }

  // componentDidMount() {
  //   console.log('did mount');
  //   this.props.fetchTasks(this.props.signIn.token, this.props.match.params.id);
  // }

  render() {
    const { token } = this.props.signIn;

    return (
      <Layout
        debugScreenName="Экран создания задачи"
        debugAuthToken={token}
      >
        <div className="new-task-screen">
          <h2>Создать новую задачу</h2>
        </div>
      </Layout>
    );
  }
}

export default NewTaskScreen;