import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_REQUESTS, CREATE_REQUEST, DELETE_REQUEST,
  fetchRequestsSuccess, fetchRequestsFailure,
  createRequestSuccess, createRequestFailure,
  deleteRequestSuccess, deleteRequestFailure,
} from './actions';
import { API_URL, NOCORS_URL } from '../../../constants';

// Function for epics
async function getTaskRequests(token, taskId) {
  try {
    console.log('getTaskRequests', token, taskId);
    const url = `${API_URL}/api/request/by-task?task_id=${taskId}`;
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(NOCORS_URL + url, params);
    const responseJson = await response.json();

    return responseJson;
  } catch (e) {
    throw e;
  }
}

async function createRequest(token, requestDetails) {
  console.log('create request epic helper func');
//   try {
//     const url = `${API_URL}/api/request/create`;
//     const body = {
//       task_id: requestDetails.taskId,
//       author_id: requestDetails.authorId,
//       text: requestDetails.text,
//     };
//     const params = {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-type': 'application/json',
//         'Authorization': 'Bearer ' + token,
//       },
//       body: JSON.stringify(body),
//     };

//     const response = await fetch(NOCORS_URL + url, params);
//     const data = await response.json();

//     data.success = (Math.random() > 0.5) ? true : false; // TESTING!!!

//     console.log('createTask', data);
//     return data;
//   } catch (e) {
//     throw e;
//   }
}

async function deleteRequest(token, requestId) {
  console.log('delete request epic helper func');
  try {
    const url = `${API_URL}/api/request/delete?request_id=${requestId}`;
    const params = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('deleteRequest', data);
    data.data.id = requestId;
    return data;
  } catch (e) {
    throw e;
  }
}

// Epics
function fetchRequestsEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_REQUESTS)
    .pipe(
      mergeMap((payload) => {
        const { token, taskId } = payload.payload;
        console.log('fetch requests', token);
        return from(getTaskRequests(token, taskId));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchRequestsSuccess(response.data);
        } else {
          return fetchRequestsFailure(response.data);
        }
      }),
      catchError(error => {
        return of(fetchRequestsFailure(error));
      })
    )
}

function createRequestEpic(action$) {
  console.log(action$);
  return action$
    .ofType(CREATE_REQUEST)
    .pipe(
      mergeMap((payload) => {
        const { token, requestDetails } = payload.payload;
        return from(createRequest(token, requestDetails));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          console.log('create request success');
          return createRequestSuccess(response.data);
        } else {
          console.log('create request failed');
          return createRequestFailure(response.data);
        }
      }),
      catchError(error => {
        return of(createRequestFailure(error));
      })
    )
}

function deleteRequestEpic(action$) {
  console.log(action$);
  return action$
    .ofType(DELETE_REQUEST)
    .pipe(
      mergeMap((payload) => {
        const { token, requestId } = payload.payload;
        console.log('delete request', token, requestId);
        return from(deleteRequest(token, requestId));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return deleteRequestSuccess(+response.data.id);
        } else {
          return deleteRequestFailure(response.data);
        }
      }),
      catchError(error => {
        return of(deleteRequestFailure(error));
      })
    )
}

export const epics = combineEpics(
  fetchRequestsEpic,
  createRequestEpic,
  deleteRequestEpic,
);