import React, { Component } from 'react';
import moment from 'moment';

import './Comment.scss';

class Comment extends Component {
  handleClick = () => {
    console.log('click on delete');
    this.props.onDelete(this.props.id);
  }

  render() {
    const { id, text, author, created_at } = this.props;

    return (
      <div className="comment">
        <div className="comment__body">
          {text}
        </div>
        <div className="comment__footer">
          <div className="comment__footer_left">
            <div>
              Автор: {author.full_name}
            </div>
            <div>
              Создан: {moment(created_at * 1000).format('Do MMMM YYYY HH:mm:ss')}
            </div>
          </div>
          <div className="comment__footer_right">
            {this.props.onDelete ? (
              <div
                onClick={this.handleClick}
              >
                <span>Удалить</span>
              </div>
            ) : (
              <div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
    
export default Comment;
