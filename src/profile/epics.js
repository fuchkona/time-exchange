import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_PROFILE,
  fetchProfileSuccess, fetchProfileFailure, FETCH_PROFILE_TASKS, fetchProfileTasksSuccess, fetchProfileTasksFailure,
} from './actions';
import { NOCORS_URL, API_URL } from "../constants";

// Function for epics
async function getProfile(token) {
  try {
    const url = API_URL + '/api/user/profile?expand=time,status,created_at';
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('getProfile', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function getAllProfileTasks(token, workerId, page = null, perPage = null) {
  try {
    let url = API_URL + '/api/task/by-worker?worker_id=' + workerId;

    if(page != null && perPage != null){
      url = url + '&page=' + page + '&per-page=' + perPage;
    }
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    data.totalTasks = response.headers.get('X-Pagination-Total-Count');
    console.log('getProfileTasks', data);
    return data;
  } catch (e) {
    throw e;
  }
}


// Epics
function fetchProfileEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_PROFILE)
    .pipe(
      mergeMap((payload) => {
        return from(getProfile(payload.payload.token))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchProfileSuccess(response.data);
        } else {
          return fetchProfileFailure(response);
        }
      }),
      catchError(error => {
        return of(fetchProfileFailure(error));
      })
    )
}

function fetchProfileTasksEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_PROFILE_TASKS)
    .pipe(
      mergeMap((payload) => {
        return from(getAllProfileTasks(
          payload.payload.token,
          payload.payload.workerId,
          payload.payload.page,
          payload.payload.perPage
        ))
      }),
      map(response => {
        console.log(response);
        if(response.success) {
          return fetchProfileTasksSuccess(response.data, +response.totalTasks);
        } else {
          return fetchProfileFailure(response);
        }
      }),
      catchError(error => {
        return of(fetchProfileTasksFailure(error));
      })
    )
}


export const epics = combineEpics(
  fetchProfileEpic,
  fetchProfileTasksEpic
);