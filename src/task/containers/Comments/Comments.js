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

import {
  COMMENTS_DEFAULT_START_PAGE,
  COMMENTS_DEFAULT_ITEMS_PER_PAGE
} from '../../../constants';
import './Comments.scss';
import TEPagination from "../../../global/components/TEPagination/TEPagination";
import Comment from './Comment/Comment';
import CreateComment from './CreateComment/CreateComment';

class Comments extends Component {
  state = {
    activePage: COMMENTS_DEFAULT_START_PAGE,
  };

  getItemsOnPage = (comments) => {
    const startIndex = (this.state.activePage - 1) * COMMENTS_DEFAULT_ITEMS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_DEFAULT_ITEMS_PER_PAGE;
    return comments.slice(startIndex, endIndex);
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  }

  handleCreateComment = (commentText) => {
    const commentDetails = {
      taskId: this.props.taskId,
      authorId: this.props.userId,
      text: commentText,
    };
    console.log('добавляем', commentDetails);
    this.props.createComment(this.props.token, commentDetails);
  }

  handleCommentDelete = (commentId) => {
    console.log('удаляем', commentId, this.props.userId);
    this.props.deleteComment(this.props.token, commentId);
  }

  componentDidMount() {
    console.log('comments', taskId);
    const { token, taskId } = this.props;
    this.props.fetchComments(token, taskId);
  }

  render() {
    console.log(this.props);
    const { comments, addingCommentText } = this.props.comments;
    const totalComments = comments.length;
    const sortedComments = comments.sort((commentA, commentB) => commentB.created_at - commentA.created_at)
    const commentsToDisplay = this.getItemsOnPage(sortedComments);
    const commentsCountOnPage = commentsToDisplay ? commentsToDisplay.length : 0;

    return (
      <div className="comments">
        <CreateComment
          addingCommentText={addingCommentText}
          handleCreateComment={this.handleCreateComment}
        />
        {commentsToDisplay.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            onDelete={(comment.author.id === this.props.userId) ? this.handleCommentDelete : null}
          />
        ))}
        <div className="comments__pagination">
            <div className="comments__pagination_pages">
              <TEPagination
                activePage={this.state.activePage}
                totalItemsCount={totalComments}
                itemsCountPerPage={COMMENTS_DEFAULT_ITEMS_PER_PAGE}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
            </div>
            <div className="comments__pagination_totals">
              Показано комментариев: {commentsCountOnPage} из {totalComments}
            </div>
          </div>
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