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
import Comments from '../../../task/containers/Comments/Comments';
import Files from '../../../task/containers/Files/Files';
import Requests from '../../../task/containers/Requests/Requests';
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
    const userId = this.props.signIn.id;
    const { id } = this.props.match.params;
    const task = this.props.tasks.tasks[0];

    console.log('task id', id, task);

    const showMakeRequestButton = task && !task.worker && task.owner.id !== userId;
    // TODO - подтягивать requester_id по данному task.id - и проверять userId не входит ли уже в requester_id's
    return (
      <Layout
        debugScreenName="Экран одной задачи"
        debugAuthToken={token}
      >
        <div className="task-screen">
          <Row className="px-5">
              {
                task ? (
                  <div className="task-screen__task_header mb-5">
                    <div>
                    Статус: {(task.currentStatus === null) ? 'null (fixme)' : task.currentStatus.title}
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
              {showMakeRequestButton ? (
                <Button
                  className="m-2 px-4 task-screen__button_take"
                  size="lg"
                  onClick={this.handleTakeTask}
                >
                  Взять в работу
                </Button>
              ) : (
                <div>
                </div>
              )}
            <div className="task-screen__comments m-2">
              <div className="task-screen__comments_title mb-2">Комментарии</div>
                <Comments userId={userId} token={token} taskId={id} />
              </div>
            </Col>
            <Col md="3">
              <div className="task-screen__files m-2">
                <div className="task-screen__files_title mb-2">Файлы</div>
                <Files token={token} taskId={id} />
              </div>
              <div className="task-screen__requests m-2">
                <div className="task-screen__requests_title mb-2">Заявки на исполнение</div>
                <Requests token={token} taskId={id} />
              </div>
            </Col>
          </Row>
          <Row className="px-5">
            <div className="task-screen__task_footer mt-5 mb-2">
              {task ? (
                <div className="mt-3">
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
              )}
            </div>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default TaskScreen;