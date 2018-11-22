import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';

// Actions
export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

// Function for reducer


// Reducer
const defaultTasksState = {
  tasks: [],
  fetching: false,
};

function tasks(state = defaultTasksState, action) {
  switch(action.type) {
    case 'FETCH_TASKS':
      return {
        ...state,
        fetching: true,
      };

    case 'FETCH_TASKS_SUCCESS':
      console.log(action.payload);
      return {
        ...state,
        tasks: action.payload.tasks,
        fetching: false,
      };

    case 'FETCH_TASKS_FAILURE':
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  tasks,
});

export function fetchTasks(token) {
  return {
    type: FETCH_TASKS,
    payload: { token },
  };
}

export function fetchTasksSuccess(tasks) {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: { tasks },
  };
}

export function fetchTasksFailure(response) {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: { status: response },
  };
}

// Function for epics
async function getAllTasks(token) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'back-exchange.herokuapp.com/api/tasks';
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    const blob = await fetch(proxyUrl + url, params);
    const data = await blob.json();

    console.log(data);
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
          return fetchTasksSuccess(response.data.tasks);
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