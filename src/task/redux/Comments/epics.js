import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_COMMENTS, CREATE_COMMENT, DELETE_COMMENT,
  fetchCommentsSuccess, fetchCommentsFailure,
  createCommentSuccess, createCommentFailure,
  deleteCommentSuccess, deleteCommentFailure,
} from './actions';

// Function for epics
async function getTaskComments(token, taskId) {
  try {
    console.log('getTaskComments', token, taskId);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `back-exchange.herokuapp.com/api/comment/by-task?task_id=${taskId}`;
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = fetch(proxyUrl + url, params);
    const responseJson = await response.json();

    return responseJson;
  } catch (e) {
    throw e;
  }
}

async function createComment(token, commentDetails) {
  console.log('createComment', token, commentDetails);
}

async function deleteComment(token, commentId) {
  console.log('deleteComment', token, commentId);
}

// Epics
function fetchCommentsEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_COMMENTS)
    .pipe(
      mergeMap((payload) => {
        const { token, taskId } = payload.payload;
        console.log('fetch comments', token);
        return from(getTaskComments(token, taskId));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchCommentsSuccess(response.data);
        } else {
          return fetchCommentsFailure(response.data);
        }
      }),
      catchError(error => {
        return of(fetchCommentsFailure(error));
      })
    )
}

function createCommentEpic(action$) {
  console.log(action$);
  return action$
    .ofType(CREATE_COMMENT)
    .pipe(
      mergeMap((payload) => {
        const { token, commentDetails } = payload.payload;
        console.log('create task', token, commentDetails);
        return from(createComment(token, commentDetails));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return createCommentSuccess(response.data);
        } else {
          return createCommentFailure(response.data);
        }
      }),
      catchError(error => {
        return of(createCommentFailure(error));
      })
    )
}

function deleteCommentEpic(action$) {
  console.log(action$);
  return action$
    .ofType(DELETE_COMMENT)
    .pipe(
      mergeMap((payload) => {
        const { token, commentId } = payload.payload;
        console.log('delete comment', token, commentId);
        return from(deleteComment(token, commentId));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return deleteCommentSuccess(+response.data.id);
        } else {
          return deleteCommentFailure(response.data);
        }
      }),
      catchError(error => {
        return of(deleteCommentFailure(error));
      })
    )
}

export const epics = combineEpics(
  fetchCommentsEpic,
  createCommentEpic,
  deleteCommentEpic,
);