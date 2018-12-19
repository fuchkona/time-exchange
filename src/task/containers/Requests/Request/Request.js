import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './Request.scss';

class Request extends Component {
  handleDelete = () => {
    this.props.onDelete(this.props.id);
  }

  handleAssign = () => {
    const requestInfo = {
      id: this.props.id,
      requester: this.props.requester,
      need_time: this.props.need_time,
    };
    this.props.onAssign(requestInfo);
  }

  render() {
    const { index, requester, need_time } = this.props;

    return (
      <tr className="request">
        <td className="request__index">{index}</td>
        <td className="request__username"><Link to={`/user/${requester.id}`}>{requester.username}</Link></td>
        <td className="request__needtime">{need_time}</td>
        <td className="request__assign">{this.props.onAssign ? <span onClick={this.handleAssign}><FontAwesomeIcon icon={faUserCheck} /></span> : <span></span>}</td>
        <td className="request__delete">{this.props.onDelete ? <span onClick={this.handleDelete}><FontAwesomeIcon icon={faTimes} /></span> : <span></span>}</td>
      </tr>
    );
  }
}
    
export default Request;
