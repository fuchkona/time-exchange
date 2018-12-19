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

import './CreateRequest.scss';

export default class CreateRequest extends Component {
  state = {
    needTime: '',
    needTimeError: false,
  };

  handleCreateRequest = () => {
    const { needTime } = this.state;
    // НИЖЕ - Предварительная проверка на фронте
    let fieldsAreValid = true;
    if (!needTime) {
      this.setState({ needTimeError: true });
      fieldsAreValid = false;
    }
    // ЕСЛИ ВСЕ ОК - то вызываем метод для работы с беком
    if (fieldsAreValid) {
      this.props.handleCreateRequest(needTime);
    } else {
      setTimeout(() => this.setState({
        needTimeError: false,
      }), 2000);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.open !== this.props.open && !this.props.open) {
      this.setState({
        needTime: '',
        needTimeError: false,
      });
    }
  }

  render() {
    const className = 'create-request';

    return (
      <Modal autoFocus={false} size="lg" centered isOpen={this.props.open} toggle={this.props.handleToggle} className={className}>
        <ModalBody>
          <div className="create-request-form">
            <Form>
              <FormGroup>
                <Label for="needTime">Предложите время, за которое можете выполнить задачу</Label>
                <Input
                  id="needTime" type="text" name="needTime" placeholder="Введите время (целое число больше 0)" value={this.state.needTime}
                  autoFocus
                  invalid={this.state.needTimeError}
                  onChange={this.handleChange}
                />
                <FormFeedback>Время должно быть больше 0!</FormFeedback>
              </FormGroup>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="ml-auto" onClick={this.handleCreateRequest}>Оставить заявку</Button>
          <Button className="mr-auto" onClick={this.props.handleToggle}>Отмена</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
