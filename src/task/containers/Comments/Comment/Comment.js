import React, { Component } from 'react';

import './Comment.scss';

class Comment extends Component {
  render() {
    return (
      <div className="comment">
        {this.props.id}
      </div>
    );
  }
}

export default Comment;