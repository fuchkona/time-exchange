const MODULE_NAME = 'MAIN';

export const FETCH_TASKS = `${MODULE_NAME}/FETCH_TASKS`;
export const FETCH_TASKS_SUCCESS = `${MODULE_NAME}/FETCH_TASKS_SUCCESS`;
export const FETCH_TASKS_FAILURE = `${MODULE_NAME}/FETCH_TASKS_FAILURE`;

export const CREATE_TASK_MODAL_TOGGLE = `${MODULE_NAME}/CREATE_TASK_MODAL_TOGGLE`;
export const CREATE_TASK = `${MODULE_NAME}/CREATE_TASK`;
export const CREATE_TASK_SUCCESS = `${MODULE_NAME}/CREATE_TASK_SUCCESS`;
export const CREATE_TASK_FAILURE = `${MODULE_NAME}/CREATE_TASK_FAILURE`;

export function fetchTasks(token, taskId = null) {
  return {
    type: FETCH_TASKS,
    payload: { token, taskId },
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
    payload: { errors: response },
  };
}

export function createTaskModalToggle() {
  return {
    type: CREATE_TASK_MODAL_TOGGLE,
  };
}

export function createTask(token, taskDetails) {
  return {
    type: CREATE_TASK,
    payload: { token, taskDetails },
  };
}

export function createTaskSuccess(task) {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: { task },
  };
}

export function createTaskFailure(response) {
  return {
    type: CREATE_TASK_FAILURE,
    payload: { errors: response },
  };
}
