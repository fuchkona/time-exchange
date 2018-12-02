import { combineReducers } from 'redux';
import {
  FETCH_TASKS, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE,
  CREATE_TASK, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultTasksState = {
  tasks: [],
  fetching: false,
  addingTask: false,
};

function tasks(state = defaultTasksState, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_TASKS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        tasks: action.payload.tasks,
        totalTasks: action.payload.totalTasks,
        fetching: false,
      };

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        fetching: false,
      };

    case CREATE_TASK:
      return {
        ...state,
        addingTask: true,
      };

    case CREATE_TASK_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        tasks: state.tasks.concat(action.payload.task),
        addingTask: false,
      };

    case CREATE_TASK_FAILURE:
      return {
        ...state,
        addingTask: false,
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  tasks,
});
