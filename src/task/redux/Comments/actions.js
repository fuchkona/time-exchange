const MODULE_NAME = 'TASK';

export const FETCH_COMMENTS = `${MODULE_NAME}/FETCH_COMMENTS`;
export const FETCH_COMMENTS_SUCCESS = `${MODULE_NAME}/FETCH_COMMENTS_SUCCESS`;
export const FETCH_COMMENTS_FAILURE = `${MODULE_NAME}/FETCH_COMMENTS_FAILURE`;

export const CREATE_COMMENT = `${MODULE_NAME}/CREATE_COMMENT`;
export const CREATE_COMMENT_SUCCESS = `${MODULE_NAME}/CREATE_COMMENT_SUCCESS`;
export const CREATE_COMMENT_FAILURE = `${MODULE_NAME}/CREATE_COMMENT_FAILURE`;

export const DELETE_COMMENT = `${MODULE_NAME}/DELETE_COMMENT`;
export const DELETE_COMMENT_SUCCESS = `${MODULE_NAME}/DELETE_COMMENT_SUCCESS`;
export const DELETE_COMMENT_FAILURE = `${MODULE_NAME}/DELETE_COMMENT_FAILURE`;

export function fetchComments(token, taskId) {
  return {
    type: FETCH_COMMENTS,
    payload: { token, taskId },
  };
}

export function fetchCommentsSuccess(comments) {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    payload: { comments },
  };
}

export function fetchCommentsFailure(response) {
  return {
    type: FETCH_COMMENTS_FAILURE,
    payload: { errors: response },
  };
}

export function createComment(token, commentDetails) {
  return {
    type: CREATE_COMMENT,
    payload: { token, commentDetails },
  };
}

export function createCommentSuccess(comment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: { comment },
  };
}

export function createCommentFailure(response) {
  return {
    type: CREATE_COMMENT_FAILURE,
    payload: { errors: response },
  };
}

export function deleteComment(token, commentId) {
  return {
    type: DELETE_COMMENT,
    payload: { token, commentId },
  };
}

export function deleteCommentSuccess(commentId) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: { commentId },
  };
}

export function deleteCommentFailure(response) {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: { errors: response },
  };
}
