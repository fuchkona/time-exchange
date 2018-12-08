import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRequests, assignRequest, deleteRequest } from '../../redux/Requests/actions';

import './Requests.scss';
import Request from './Request/Request';

class Requests extends Component {
  handleRequestDelete = (requestId) => {
    console.log('удаляем', requestId, this.props.userId);
    this.props.deleteRequest(this.props.token, requestId);
  }

  handleRequestAssign = (requestId) => {
    console.log('подтверждаем', requestId, this.props.userId);
    // this.props.assignRequest(this.props.token, requestId);
  }

  componentDidMount() {
    console.log('requests', taskId);
    const { token, taskId } = this.props;
    this.props.fetchRequests(token, taskId);
  }

  render() {
    const { requests } = this.props.requests;
    const totalRequests = requests.length;
    // const sortedRequests = requests.sort((requestA, requestB) => requestB.created_at - requestA.created_at)

    return (
      <table className="requests">
        <tbody>
          {requests.map((request, index) => (
            <Request
              key={request.id}
              index={index+1}
              {...request}
              onDelete={(request.requester.id === this.props.userId) ? this.handleRequestDelete : null}
              onAssign={(request.requester.id !== this.props.userId && this.props.taskOwnerId === this.props.userId) ? this.handleRequestAssign : null}
            />
          ))}
        </tbody>
      </table>
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