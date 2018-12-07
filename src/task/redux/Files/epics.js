import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_FILES, fetchFilesSuccess, fetchFilesFailure,
} from './actions';

// Function for epics
async function getFilesByTask(token, taskId) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `back-exchange.herokuapp.com//api/file/files-by-task?=${taskId}`;
    const params = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    };
    const response = await fetch(proxyUrl + url, params);
    const data = await response.json();

    console.log('get files by task', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function createFile(token, file) {
  console.log('createFile', token, file);
}

async function deleteFile(token, fileId) {
  console.log('deleteFile', token, fileId);
}

// Epics
function fetchFilesEpic(action$) {
  console.log(action$);
  return action$
    .ofType(FETCH_FILES)
    .pipe(
      mergeMap((payload) => {
        const { token, taskId } = payload.payload;
        console.log('fetch comments', token);
        return from(getFilesByTask(token, taskId));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return fetchFilesSuccess(response.data);
        } else {
          return fetchFilesFailure(response.data);
        }
      }),
      catchError(error => {
        return of(fetchFilesFailure(error));
      })
    )
}



export const epics = combineEpics(
  fetchFilesEpic,

);