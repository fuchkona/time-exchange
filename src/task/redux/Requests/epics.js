import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_REQUESTS, CREATE_REQUEST, ASSIGN_REQUEST, DELETE_REQUEST,
  fetchRequests, fetchRequestsSuccess, fetchRequestsFailure,
  createRequestSuccess, createRequestFailure,
  assignRequestSuccess, assignRequestFailure,
  deleteRequestSuccess, deleteRequestFailure,
} from './actions';
import { signOutSuccess } from '../../../auth/actions';
import cookie from 'react-cookie';
import { fetchTasks } from '../../../main/actions';
import { API_URL, NOCORS_URL } from '../../../constants';

// Function for epics
async function getTaskRequests(token, taskId) {
  try {
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
  try {
    const url = `${API_URL}/api/request/create`;
    const body = {
      task_id: requestDetails.taskId,
      requester_id: requestDetails.userId,
      need_time: requestDetails.needTime,
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

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    // data.success = (Math.random() > 0.5) ? true : false; // TESTING!!!

    console.log('createRequest', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function assignRequest(token, requestDetails) {
  console.log('assign request epic helper func', requestDetails);
  try {
    const url = `${API_URL}/api/task/accept-request/?request_id=${requestDetails.id}`;
    const params = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();
    data.requestDetails = requestDetails;
    data.token = token;
    // data.success = (Math.random() > 0.5) ? true : false; // TESTING!!!

    console.log('assignRequest', data);
    return data;
  } catch (e) {
    throw e;
  }
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
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        return fetchRequestsFailure(response.data);
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
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        console.log('create request failed');
        return createRequestFailure(response.data);
      }),
      catchError(error => {
        return of(createRequestFailure(error));
      })
    )
}

function assignRequestEpic(action$) {
  console.log(action$);
  return action$
    .ofType(ASSIGN_REQUEST)
    .pipe(
      mergeMap((payload) => {
        const { token, requestDetails } = payload.payload;
        return from(assignRequest(token, requestDetails));
      }),
      mergeMap(response => {
        console.log(response);
        if (response.success) {
          console.log('assign request success', response.token, response.requestDetails.taskId);
          return ([
            assignRequestSuccess(),
            fetchRequests(response.token, response.requestDetails.taskId),
            fetchTasks(response.token, response.requestDetails.taskId),
          ]);
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        return of(assignRequestFailure(response.data));
      }),
      catchError(error => {
        return of(assignRequestFailure(error));
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
        } else if(response.data.status == 401) {
          console.log('unauthorised');
          cookie.remove('time-exchange-signin');
          return signOutSuccess();
        }
        return deleteRequestFailure(response.data);
      }),
      catchError(error => {
        return of(deleteRequestFailure(error));
      })
    )
}

export const epics = combineEpics(
  fetchRequestsEpic,
  createRequestEpic,
  assignRequestEpic,
  deleteRequestEpic,
);