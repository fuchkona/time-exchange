const MODULE_NAME = 'MAIN';

export const FETCH_TASKS = `${MODULE_NAME}/FETCH_TASKS`;
export const FETCH_TASKS_SUCCESS = `${MODULE_NAME}/FETCH_TASKS_SUCCESS`;
export const FETCH_TASKS_FAILURE = `${MODULE_NAME}/FETCH_TASKS_FAILURE`;

export function fetchTasks(token) {
  return {
    type: FETCH_TASKS,
    payload: { token },
  };
}

export function fetchTasksSuccess(tasks, totalTasks) {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: { tasks, totalTasks },
  };
}

export function fetchTasksFailure(response) {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: { status: response },
  };
}
