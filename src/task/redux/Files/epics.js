import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_FILES, fetchFilesSuccess, fetchFilesFailure, CREATE_FILE, createFileSuccess, createFileFailure,
} from './actions';
import { NOCORS_URL, API_URL } from "../../../constants";


// Function for epics
async function getFilesByTask(token, taskId) {
  try {
    const url = `back-exchange.herokuapp.com/api/file/files-by-task?task_id=${taskId}`;
    const params = {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    };
    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('get files by task', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function createFile(token, fileDetails) {
  try {
    const url = API_URL + `/api/file/create`;

    console.log('createFile', token, fileDetails);

    let formData = new FormData();
    formData.append('file', fileDetails.file);
    formData.append('user_id', fileDetails.userId);
    formData.append('task_id', fileDetails.taskId);

    const params = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body: formData,
    };
    const response = await fetch(NOCORS_URL + url, params);
    const data = await response.json();

    console.log('create file by task', data);
    return data;
  } catch (e) {
    throw e;
  }
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
        console.log('fetch files', token);
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

function createFileEpic(action$) {
  console.log(action$);
  return action$
    .ofType(CREATE_FILE)
    .pipe(
      mergeMap((payload) => {
        const { token, fileDetails } = payload.payload;
        console.log('create file', token, fileDetails);
        return from(createFile(token, fileDetails));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return createFileSuccess(response.data);
        } else {
          return createFileFailure(response.data);
        }
      }),
      catchError(error => {
        return of(createFileFailure(error));
      })
    )
}



export const epics = combineEpics(
  fetchFilesEpic,
  createFileEpic

);