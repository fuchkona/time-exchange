import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  FETCH_TASKS, CREATE_TASK, DELETE_TASK,
  fetchTasksSuccess, fetchTasksFailure,
  createTaskSuccess, createTaskFailure,
  deleteTaskSuccess, deleteTaskFailure,
} from './actions';
import { faUserInjured } from '@fortawesome/free-solid-svg-icons';
import {API_URL} from "../constants";

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
    const url = API_URL + '/api/tasks'; // ?page=1&per-page=1

    const response = await fetchGetTasks(url, token);
    const responseJson = await response.json();

    // responseJson.totalTasks = response.headers.get('X-Pagination-Total-Count');
    console.log('getAllTasks', responseJson);
    return responseJson;
  } catch (e) {
    throw e;
  }
}

async function getTaskById(token, taskId) {
  try {
    const url = API_URL + `/api/tasks/${taskId}`;

    const response = await fetchGetTasks(url, token);
    const responseJson = await response.json();

    // responseJson.totalTasks = 1;
    responseJson.data = new Array(responseJson.data);
    console.log('getTaskById', responseJson);
    return responseJson;
  } catch (e) {
    throw e;
  }
}

async function createTask(token, taskDetails) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = API_URL + '/api/task/create';
    const body = {
      title: taskDetails.title,
      description: taskDetails.description,
      deadline: taskDetails.deadline,
      owner_id: taskDetails.userId,
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

    console.log('createTask', data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function deleteTask(token, taskId) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = API_URL + `/api/task/delete?task_id=${taskId}`;
    const params = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const response = await fetch(proxyUrl + url, params);
    const data = await response.json();

    console.log('deleteTask', data);
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
          return fetchTasksSuccess(response.data); // , +response.totalTasks
        } else {
          return fetchTasksFailure(response.data);
        }
      }),
      catchError(error => {
        return of(fetchTasksFailure(error));
      })
    )
}

function createTaskEpic(action$) {
  console.log(action$);
  return action$
    .ofType(CREATE_TASK)
    .pipe(
      mergeMap((payload) => {
        const { token, taskDetails } = payload.payload;
        console.log('create task', token, taskDetails);
        return from(createTask(token, taskDetails));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return createTaskSuccess(response.data);
        } else {
          return createTaskFailure(response.data);
        }
      }),
      catchError(error => {
        return of(createTaskFailure(error));
      })
    )
}

function deleteTaskEpic(action$) {
  console.log(action$);
  return action$
    .ofType(DELETE_TASK)
    .pipe(
      mergeMap((payload) => {
        const { token, taskId } = payload.payload;
        console.log('delete task', token, taskId);
        return from(deleteTask(token, taskId));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return deleteTaskSuccess(+response.data.id);
        } else {
          return deleteTaskFailure(response.data);
        }
      }),
      catchError(error => {
        return of(deleteTaskFailure(error));
      })
    )
}



export const epics = combineEpics(
  fetchTasksEpic,
  createTaskEpic,
  deleteTaskEpic,
);