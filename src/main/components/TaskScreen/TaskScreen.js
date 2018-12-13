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
import CreateRequest from './TaskScreenModals/CreateRequest';
import './TaskScreen.scss';

class TaskScreen extends Component {

  handleCreateRequest = (needTime) => {
    console.log('create request to task - click');
    const taskId = this.props.tasks.tasks[0] ? this.props.tasks.tasks[0].id : undefined;
    if (taskId) {
      const requestDetails = {
        taskId,
        needTime,
        userId: this.props.signIn.id,
      };
      console.log(requestDetails);
      this.props.createRequest(this.props.signIn.token, requestDetails);
    } else {
      console.log('no task on screen!!!'); // error
    }
  }

  handleCreateRequestToggle = () => {
    this.props.createRequestModalToggle();
  };

  componentDidMount() {
    console.log('did mount');
    this.props.fetchTasks(this.props.signIn.token, this.props.match.params.id);
  }

  static canUserSeeFiles(task, userId){
    if (task){
      if ((task.owner.id === userId) || (task.worker && task.worker.id === userId)){
        return true;
      }
    }
    return false;
  }

  render() {
    const { token } = this.props.signIn;
    const userId = this.props.signIn.id;
    const { id } = this.props.match.params;
    const task = this.props.tasks.tasks[0];
    const taskOwnerId = task ? task.owner.id : undefined;
    console.log('task id', id, task);

    const taskRequesters = this.props.requests.requests.map((request) => request.requester.id);
    const showMakeRequestButton = task && !task.worker && task.owner.id !== userId && !taskRequesters.includes(userId);


    const showFiles = TaskScreen.canUserSeeFiles(task, userId);

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
                      Автор: <Link to={`/user/${task.owner.id}`}>{task.owner.full_name}</Link>
                    </div>
                    <div>
                      Исполнитель: {(task.worker === null) ? 'Не назначен' : <Link to={`/user/${task.worker.id}`}>{task.worker.full_name}</Link>}
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
              <div className="task-screen__create-request-form">
                <CreateRequest
                  open={this.props.requests.modalCreateRequestOpen}
                  handleToggle={this.handleCreateRequestToggle}
                  handleCreateRequest={this.handleCreateRequest}
                />
              </div>
              {showMakeRequestButton ? (
                <Button
                  className="m-2 px-4 task-screen__button_take"
                  size="lg"
                  onClick={this.handleCreateRequestToggle}
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
              {showFiles ? <div className="task-screen__files m-2">
                <div className="task-screen__files_title mb-2">Файлы</div>
                <Files userId={userId} token={token} taskId={id} />
              </div> : null}

              <div className="task-screen__requests m-2">
                <div className="task-screen__requests_title mb-2">Заявки на исполнение</div>
                {task && task.worker ? (
                  <div>
                    Задача уже в работе
                  </div>
                ) : (
                  <Requests taskOwnerId={taskOwnerId} userId={userId} token={token} taskId={id} />
                )}
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