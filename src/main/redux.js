import { combineReducers } from 'redux';
import {
  FETCH_TASKS, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultTasksState = {
  tasks: [],
  fetching: false,
  totalTasks: 0,
};

function tasks(state = defaultTasksState, action) {
  switch(action.type) {
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

    default:
      return state;
  }
}

export const reducer = combineReducers({
  tasks,
});
