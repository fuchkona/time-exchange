import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { fetchRequests, assignRequest, deleteRequest } from '../../redux/Requests/actions';

import './Requests.scss';
import Request from './Request/Request';

class Requests extends Component {
  state = {
    modal: false,
    requestInfo: {},
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  handleRequestDelete = (requestId) => {
    console.log('удаляем', requestId, this.props.userId);
    this.props.deleteRequest(this.props.token, requestId);
  }

  handleRequestAssign = () => {
    console.log('подтверждаем после модалки', this.state.requestInfo, this.props.userId);
    const { requestInfo } = this.state;
    requestInfo.taskId = this.props.taskId;
    this.props.assignRequest(this.props.token, this.state.requestInfo);
    this.setState({ modal: false, requestInfo: {} });
  }

  handleRequestAssignModal = (requestInfo) => {
    this.setState({ modal: true, requestInfo });
  }

  componentDidMount() {
    const { token, taskId } = this.props;
    this.props.fetchRequests(token, taskId);
  }

  render() {
    const { requests } = this.props.requests;
    // const totalRequests = requests.length;
    // const sortedRequests = requests.sort((requestA, requestB) => requestB.created_at - requestA.created_at)
    const { requester, need_time } = this.state.requestInfo;

    return (
      <div className="requests">
        <table>
          <tbody>
            {requests.map((request, index) => (
              <Request
                key={request.id}
                index={index+1}
                {...request}
                onDelete={(request.requester.id === this.props.userId) ? this.handleRequestDelete : null}
                onAssign={(request.requester.id !== this.props.userId && this.props.taskOwnerId === this.props.userId) ? this.handleRequestAssignModal : null}
              />
            ))}
          </tbody>
        </table>
        <Modal isOpen={this.state.modal} toggle={this.handleClose}>
          <ModalHeader toggle={this.handleClose}>Назначить исполнителя?</ModalHeader>
            <ModalBody>
              <div>
                - Исполнитель: {requester ? requester.username : null}
              </div>
              <div>
                - Желаемое время за задачу: {need_time ? need_time : null}
              </div>
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleRequestAssign}>Назначить</Button>
            <Button color="secondary" onClick={this.handleClose}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.requests,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchRequests, assignRequest, deleteRequest,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Requests);