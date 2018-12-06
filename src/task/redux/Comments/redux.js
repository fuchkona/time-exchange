import { combineReducers } from 'redux';
import {
  FETCH_COMMENTS, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE,
  CREATE_COMMENT, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE,
  DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultCommentsState = {
  comments: [],
  fetching: false,
  addingComment: false,
  deletingCommentk: false,
  errors: null,
};

function comments(state = defaultCommentsState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_COMMENTS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        comments: action.payload.comments,
        fetching: false,
      };

    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.payload.errors,
      };

    case CREATE_COMMENT:
      return {
        ...state,
        addingComment: true,
      };

    case CREATE_COMMENT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        comments: state.comments.concat(action.payload.comment),
        addingComment: false,
      };

    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        addingComment: false,
        errors: action.payload.errors,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        deletingComment: true,
      };

    case DELETE_COMMENT_SUCCESS:
      console.log('delete comment success', action.payload);
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload.commentId),
        deletingComment: false,
      };

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deletingComment: false,
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  comments,
});
