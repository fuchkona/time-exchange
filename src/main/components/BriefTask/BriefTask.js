import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import moment from 'moment';

import './BriefTask.scss';

class BriefTask extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleClick = () => {
    this.setState({
      modal: true,
    });
  };

  handleDelete = () => {
    this.props.onDelete(this.props.id);
    this.setState({
      modal: false,
    });
  };

  render() {
    const task = this.props;
    console.log('one task', task);

    return (
        <div>
          <Card className="brief-task m-2">
            <CardHeader className="brief-task__header">
              <div className="brief-task__header_title">
                {task.title}
              </div>
              <div className="brief-task__header_info">
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
            </CardHeader>

            <CardBody className="brief-task__body">
              <CardText>
                {task.description}
              </CardText>
            </CardBody>
            <CardFooter className="brief-task__footer">
              <div className="brief-task__footer_info">
                <div>
                  Создана: {moment(task.created_at * 1000).format('Do MMMM YYYY')}
                </div>
                <div>
                  Дедлайн: {moment(task.deadline * 1000).format('Do MMMM YYYY')}
                </div>
              </div>
              <div className="brief-task__footer_controls">
                {this.props.onDelete ? (
                    <div
                        onClick={this.handleClick}
                    >
                      <span>Удалить</span>
                      <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Подтвердите действие</ModalHeader>
                        <ModalBody>
                          Удалить задачу?
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.handleDelete}>Удалить</Button>
                          <Button color="secondary" onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                ) : (
                    <div>
                    </div>
                )}
                <Link to={`/task/${task.id}`}>
                  Перейти к задаче
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
    );
  }
}

export default BriefTask;