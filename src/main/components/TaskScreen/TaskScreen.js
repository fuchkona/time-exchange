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
import Task from '../Task/Task';
import Comments from '../Comments/Comments';
import Files from '../Files/Files';
import Requests from '../Requests/Requests';
import './TaskScreen.scss';

class TaskScreen extends Component {

  handleTakeTask = () => {
    console.log('take task - click');
  }

  componentDidMount() {
    console.log('did mount');
    this.props.fetchTasks(this.props.signIn.token, this.props.match.params.id);
  }

  render() {
    const { token } = this.props.signIn;
    const { id } = this.props.match.params;
    const task = this.props.tasks.tasks[0];

    let comments;
    let files;
    let requests;

    console.log('task id', id, task);

    return (
      <Layout
        debugScreenName="Экран одной задачи"
        debugAuthToken={token}
      >
        <div className="task-screen">
          <Row>
            <div className="task-screen__task_header">
              {
                task ? (
                  <div>
                    <div>
                      Статус: {(task.contract_time === null) ? 'Неясен' : task.contract_time}
                    </div>
                    <div>
                      Автор: {task.owner.full_name}
                    </div>
                    <div>
                      Исполнитель: {(task.worker === null) ? 'Не назначен' : task.worker.full_name}
                    </div>
                  </div>
                ) : (
                    <div>
                    </div>
                  )
              }
            </div>
          </Row>
          <Row>
            <Col md="9">
              <div className="task-screen__task">
                {task ? <Task {...task} /> : null}
              </div>
              <div className="task-screen__comments">
                <div className="task-screen__comments_title">Комментарии</div>
                {comments ? <Comments {...comments} /> : null}
              </div>
            </Col>
            <Col md="3">
              <div className="task-screen__files">
                <div className="task-screen__files_title">Файлы</div>
                {files ? <Files {...files} /> : null}
              </div>
              <div className="task-screen__requests">
                <div className="task-screen__requests_title">Заявки на исполнение</div>
                {requests ? <Requests {...requests} /> : null}
              </div>
            </Col>
          </Row>
          <Row>
            <div className="task-screen__task_footer">
              <Button
                className="m-2 px-4 task-screen__button_take"
                size="lg"
                onClick={this.handleTakeTask}
              >
                Взять в работу
            </Button>
              {
                task ? (
                  <div>
                    <div>
                      Создана: {moment(task.created_at * 1000).format('Do MMMM YYYY')}
                    </div>
                    <div>
                      Дедлайн: {moment(task.deadline * 1000).format('Do MMMM YYYY')}
                    </div>
                  </div>
                ) : (
                    <div>
                    </div>
                  )
              }
            </div>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default TaskScreen;