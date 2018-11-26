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
async function getAllTasks(token) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'back-exchange.herokuapp.com/api/tasks'; // ?page=1&per-page=1
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(proxyUrl + url, params);
    const data = await response.json();

    data.totalTasks = response.headers.get('X-Pagination-Total-Count');
    console.log('getAllTasks', data);
    return data;
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
        console.log('fetch tasks', payload);
        return from(getAllTasks(payload.payload.token))
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