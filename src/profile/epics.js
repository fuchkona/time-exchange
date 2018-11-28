import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_PROFILE,
  fetchProfileSuccess, fetchProfileFailure,
} from './actions';

// Function for epics
async function getProfile(token) {
  console.log('getProfile')
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'back-exchange.herokuapp.com/api/user/profile?expand=time,status,created_at';
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

    console.log('getProfile', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function getAllProfileTasks(token, workerId, page = null, perPage = null) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let url = 'back-exchange.herokuapp.com/api/tasks/';

    if(page != null && perPage != null){
      url = url + '?page=' + page + '&per-page=' + perPage;
    }
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
        console.log('fetch profile', payload);
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


export const epics = combineEpics(
  fetchProfileEpic,
);