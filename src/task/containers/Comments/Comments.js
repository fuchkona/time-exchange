import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchComments, createComment, deleteComment } from '../../redux/Comments/actions';
import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";

import './Comments.scss';
import Comment from './Comment/Comment';

class Comments extends Component {
  componentDidMount() {
    console.log('comments', taskId);
    const { token, taskId } = this.props;
    this.props.fetchComments(token, taskId);
  }

  render() {
    console.log(this.props);
    const { comments } = this.props.comments;
    return (
      <div className="comments">
        {comments.map((comment) => <Comment {...comment} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchComments, createComment, deleteComment,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);