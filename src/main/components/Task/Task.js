import React, { Component } from 'react';

import './Task.scss';

class Task extends Component {
  render() {
    const task = this.props;

    return (
      <div className="task">
        <div className="task__title mb-2">
          {task.title}
        </div>
        <div className="task__description">
          {task.description}
        </div>
      </div>
    );
  }
}

export default Task;