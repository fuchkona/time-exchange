import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

import './CreateComment.scss';

class CreateComment extends Component {
  state = {
    commentText: '',
  };

  handleCreateComment = () => {
    const { commentText } = this.state;
    this.props.handleCreateComment(commentText); // лучше все же и здесь проверять на ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidUpdate(nextProps) {
    console.log('nextProps', nextProps.addingCommentText);
    console.log('this.props', this.props.addingCommentText);
    console.log('this.state', this.state.commentText);
    if (!nextProps.addingCommentText && nextProps.addingCommentText !== this.props.addingCommentText && this.state.commentText) {
      this.setState({
        commentText: '',
      });
    }
  }

  render() {
    return (
      <div className="create-comment">
        <Form>
          <FormGroup>
            <Input
              className="create-comment__input"
              id="commentText" type="textarea" rows="2" name="commentText" placeholder="Ваш комментарий..." value={this.state.commentText}
              onChange={this.handleChange}
            />
          </FormGroup>
        </Form>
        <Button disabled={!this.state.commentText} size="sm" onClick={this.handleCreateComment}>Оставить комментарий</Button>
      </div>
    );
  }
}

export default CreateComment;
