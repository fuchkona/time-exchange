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
              {
                task ? (
                  <div className="task-screen__task_header mb-5">
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
                    <div className="task-screen__task_header mb-5">
                    </div>
                  )
              }
          </Row>
          <Row>
            <Col md="9">
              <div className="task-screen__task m-2">
                {task ? <Task {...task} /> : null}
              </div>
              <div className="task-screen__comments m-2">
                <div className="task-screen__comments_title mb-2">Комментарии</div>
                {(comments && task) ? <Comments {...comments} /> : null}
              </div>
            </Col>
            <Col md="3">
              <div className="task-screen__files m-2">
                <div className="task-screen__files_title mb-2">Файлы</div>
                {(files && task) ? <Files {...files} /> : null}
              </div>
              <div className="task-screen__requests m-2">
                <div className="task-screen__requests_title mb-2">Заявки на исполнение</div>
                {(requests && task) ? <Requests {...requests} /> : null}
              </div>
            </Col>
          </Row>
          <Row>
            <div className="task-screen__task_footer mt-5">
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