import React, {Component} from 'react';
import './TEDatetime.scss';
import Datetime from 'react-datetime';

class TEDatetime extends Component {

  render() {
    return (
      <Datetime {...this.props} />
    );
  }
}

export default TEDatetime;