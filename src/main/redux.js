import { combineReducers } from 'redux';
import {
  FETCH_TASKS, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE,
  CREATE_TASK_MODAL_TOGGLE, CREATE_TASK, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE,
  DELETE_TASK, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultTasksState = {
  tasks: [],
  fetching: false,
  addingTask: false,
  deletingTask: false,
  errors: null,
  modalCreateTaskOpen: false,
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
        errors: action.payload.errors,
      };

    case CREATE_TASK_MODAL_TOGGLE:
      return {
        ...state,
        modalCreateTaskOpen: !state.modalCreateTaskOpen,
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
        modalCreateTaskOpen: false,
      };

    case CREATE_TASK_FAILURE:
      return {
        ...state,
        addingTask: false,
        errors: action.payload.errors,
      };

    case DELETE_TASK:
      return {
        ...state,
        deletingTask: true,
      };

    case DELETE_TASK_SUCCESS:
      console.log('delete task success', action.payload);
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.taskId),
        deletingTask: false,
      };

    case DELETE_TASK_FAILURE:
      return {
        ...state,
        deletingTask: false,
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  tasks,
});
