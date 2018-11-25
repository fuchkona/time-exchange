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

import './BriefTask.scss';

class BriefTask extends Component {
  render() {
    const task = this.props;
    console.log('one task', task);

    return (
        <div className="brief-task">
          <div className="brief-task__header">
            <div>
              {task.title}
            </div>
            <div>
              <div>
                Статус: {task.contract_time}
              </div>
              <div>
                Автор: {task.owner.full_name}
              </div>
              <div>
                Исполнитель: {(task.worker === null) ? 'Не назначен' : task.worker.full_name}
              </div>
            </div>
          </div>
          <div className="brief-task__body">
            {task.description}
          </div>
          <div className="brief-task__footer">
            <div>
              <div>
                Создана: {task.created_at}
              </div>
              <div>
                Дедлайн: {task.deadline}
              </div>
            </div>
            <div>
              <Link to={`/task/${task.id}`}>
                Перейти к задаче
              </Link>
            </div>
          </div>
        </div>
    );
  }
}

export default BriefTask;