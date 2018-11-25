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
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";

import './BriefTask.scss';

class BriefTask extends Component {
  render() {
    const task = this.props;
    console.log('one task', task);

    return (
      <div>
        <Card className="brief-task m-2">
          <CardHeader className="brief-task__header">
            <div>
              {task.title}
            </div>
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
          </CardHeader>

          <CardBody className="brief-task__body">
            <CardText>
              {task.description}
            </CardText>
          </CardBody>
          <CardFooter className="brief-task__footer">
            <div>
              <div>
                Создана: {task.created_at}
              </div>
              <div>
                Дедлайн: {task.deadline}
              </div>
            </div>
            <div>
              <Link to={`/tasks/${task.id}`}>
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