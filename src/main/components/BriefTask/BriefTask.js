import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";
import moment from 'moment';

import './BriefTask.scss';

class BriefTask extends Component {
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
                Автор: {task.owner.full_name}
              </div>
              <div>
                Исполнитель: {(task.worker === null) ? 'Не назначен' : task.worker.full_name}
              </div>
            </div>
          </CardHeader>

          <CardBody className="brief-task__body">
            <CardText>
              {task.description}
            </CardText>
          </CardBody>
          <CardFooter className="brief-task__footer">
            <div  className="brief-task__footer_info">
              <div>
                Создана: {moment(task.created_at * 1000).format('Do MMMM YYYY')}
              </div>
              <div>
                Дедлайн: {moment(task.deadline * 1000).format('Do MMMM YYYY')}
              </div>
            </div>
            <div>
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