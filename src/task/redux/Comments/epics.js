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
import { faAtlas } from '@fortawesome/free-solid-svg-icons';
import {API_URL} from "../../../constants";

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

    const response = await fetch(proxyUrl + url, params);
    const responseJson = await response.json();

    return responseJson;
  } catch (e) {
    throw e;
  }
}

async function createComment(token, commentDetails) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = API_URL + '/api/comment/create';
    const body = {
      task_id: commentDetails.taskId,
      author_id: commentDetails.authorId,
      text: commentDetails.text,
    };
    const params = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(proxyUrl + url, params);
    const data = await response.json();

    data.success = (Math.random() > 0.5) ? true : false; // TESTING!!!

    console.log('createTask', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function deleteComment(token, commentId) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = API_URL + `/api/comment/delete?comment_id=${commentId}`;
    const params = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(proxyUrl + url, params);
    const data = await response.json();

    console.log('deleteComment', data);
    data.data.id = commentId;
    return data;
  } catch (e) {
    throw e;
  }
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
        return from(createComment(token, commentDetails));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          console.log('create comment success');
          return createCommentSuccess(response.data);
        } else {
          console.log('create comment failed');
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