import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import moment from 'moment';

import './CreateTask.scss';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: '',
      taskDescription: '',
      taskContractTime: 0,
      taskDeadline: '2018-12-01',
      taskTitleError: false,
      taskDescriptionError: false,
      taskContractTimeError: false,
      taskDeadlineError: false,
    };
  }

  handleCreateTask = () => {
    const { taskTitle, taskDescription, taskContractTime, taskDeadline } = this.state;
    // НИЖЕ - Предварительная проверка на фронте
    let fieldsAreValid = true;
    if (!taskTitle) {
      this.setState({ taskTitleError: true });
      fieldsAreValid = false;
    }
    if (!taskDescription) {
      this.setState({ taskDescriptionError: true });
      fieldsAreValid = false;
    }
    if (taskContractTime <= 0) {
      this.setState({ taskContractTimeError: true });
      fieldsAreValid = false;
    }
    if (!taskDeadline) { // TODO - сранивать в moment
      this.setState({ taskDeadlineError: true });
      fieldsAreValid = false;
    }
    // ЕСЛИ ВСЕ ОК - то вызываем метод для работы с беком
    if (fieldsAreValid) {
      this.props.handleCreateTask(taskTitle, taskDescription, taskContractTime, taskDeadline);
    } else {
      setTimeout(() => this.setState({
        taskTitleError: false,
        taskDescriptionError: false,
        taskContractTimeError: false,
        taskDeadlineError: false,
      }), 2000);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const className = 'create-task';

    return (
      <Modal autoFocus={false} size="lg" centered isOpen={this.props.open} toggle={this.props.handleToggle} className={className}>
        <ModalBody>
          <div className="create-task-form">
            <Form>
              <FormGroup>
                <Label for="taskTitle">Заголовок</Label>
                <Input
                  id="taskTitle" type="text" name="taskTitle" placeholder="Введите заголовок задачи" value={this.state.taskTitle}
                  autoFocus
                  invalid={this.state.taskTitleError}
                  onChange={this.handleChange}
                />
                <FormFeedback>Укажите заголовок!</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="taskDescription">Описание задачи</Label>
                <Input
                  id="taskDescription" type="textarea" rows="10" name="taskDescription" placeholder="Введите подробное описание задачи" value={this.state.taskDescription}
                  invalid={this.state.taskDescriptionError}
                  onChange={this.handleChange}
                />
                <FormFeedback>Заполните описание!</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="taskContractTime">Предлагаемое к оплате время</Label>
                <Input
                  id="taskContractTime" type="number" name="taskContractTime" pvalue={this.state.taskContractTime}
                  invalid={this.state.taskContractTimeError}
                  onChange={this.handleChange}
                />
                <FormFeedback>Время должно быть больше 0!</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="taskDeadline">Дедлайн</Label>
                <Input
                  id="taskDeadline" type="date" name="taskDeadline" value={this.state.taskDeadline}
                  invalid={this.state.taskDeadlineError}
                  onChange={this.handleChange}
                />
                <FormFeedback>Дедлайн меньше чем текущее время!</FormFeedback>
              </FormGroup>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="ml-auto" onClick={this.handleCreateTask}>Создать задачу</Button>
          <Button className="mr-auto" onClick={this.props.handleToggle}>Отмена</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
