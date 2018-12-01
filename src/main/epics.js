import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_TASKS,
  fetchTasksSuccess, fetchTasksFailure,
} from './actions';

// Function for epics
async function fetchGetTasks(url, token) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const params = {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };
  return await fetch(proxyUrl + url, params);
}

async function getAllTasks(token) {
  try {
    const url = 'back-exchange.herokuapp.com/api/tasks'; // ?page=1&per-page=1

    const response = await fetchGetTasks(url, token);
    const responseJson = await response.json();

    responseJson.totalTasks = response.headers.get('X-Pagination-Total-Count');
    console.log('getAllTasks', responseJson);
    return responseJson;
  } catch (e) {
    throw e;
  }
}

async function getTaskById(token, taskId) {
  try {
    const url = `back-exchange.herokuapp.com/api/tasks/${taskId}`;

    const response = await fetchGetTasks(url, token);
    const responseJson = await response.json();

    responseJson.totalTasks = 1;
    responseJson.data = new Array(responseJson.data);
    console.log('getTaskById', responseJson);
    return responseJson;
  } catch (e) {
    throw e;
  }
}


// Epics
function fetchTasksEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_TASKS)
    .pipe(
      mergeMap((payload) => {
        const { token, taskId } = payload.payload;
        console.log('fetch tasks', token, taskId);
        if (taskId) {
          return from(getTaskById(token, taskId));
        } else {
          return from(getAllTasks(token));
        }
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchTasksSuccess(response.data, +response.totalTasks);
        } else {
          return fetchTasksFailure(response);
        }
      }),
      catchError(error => {
        return of(fetchTasksFailure(error));
      })
    )
}


export const epics = combineEpics(
  fetchTasksEpic,
);