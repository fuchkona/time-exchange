import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import moment from 'moment';
import TEDatetime from '../../../../global/components/TEDatetime/TEDatetime';

import './CreateTask.scss';

export default class CreateTask extends Component {
  state = {
    taskTitle: '',
    taskDescription: '',
    taskDeadline: moment(),
    taskTitleError: false,
    taskDescriptionError: false,
    taskDeadlineError: false,
  };

  handleCreateTask = () => {
    const { taskTitle, taskDescription, taskDeadline } = this.state;
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
    if (!taskDeadline) { // TODO - сранивать в moment
      this.setState({ taskDeadlineError: true });
      fieldsAreValid = false;
    }
    // ЕСЛИ ВСЕ ОК - то вызываем метод для работы с беком
    console.log(!taskDeadline);
    if (fieldsAreValid) {
      this.props.handleCreateTask(taskTitle, taskDescription, moment(taskDeadline).unix());
    } else {
      setTimeout(() => this.setState({
        taskTitleError: false,
        taskDescriptionError: false,
        taskDeadlineError: false,
      }), 2000);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleDatetimeChange = (value) => {
    this.setState({
      taskDeadline: value,
    });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.open !== this.props.open && !this.props.open) {
      this.setState({
        taskTitle: '',
        taskDescription: '',
        taskDeadline: moment(),
        taskTitleError: false,
        taskDescriptionError: false,
        taskDeadlineError: false,
      });
    }
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
                <Label for="taskDeadline">Дедлайн</Label>
                <TEDatetime
                  value={this.state.taskDeadline}
                  onChange={this.handleDatetimeChange}
                  inputProps={{ invalid: this.state.taskDeadlineError }} // TOFIX - invalid не работает
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
