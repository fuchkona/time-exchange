const MODULE_NAME = 'PROFILE';

export const FETCH_PROFILE = `${MODULE_NAME}/FETCH_PROFILE`;
export const FETCH_PROFILE_SUCCESS = `${MODULE_NAME}/FETCH_PROFILE_SUCCESS`;
export const FETCH_PROFILE_FAILURE = `${MODULE_NAME}/FETCH_PROFILE_FAILURE`;

export const FETCH_PROFILE_TASKS = `${MODULE_NAME}/FETCH_PROFILE_TASKS`;
export const FETCH_PROFILE_TASKS_SUCCESS = `${MODULE_NAME}/FETCH_PROFILE_TASKS_SUCCESS`;
export const FETCH_PROFILE_TASKS_FAILURE = `${MODULE_NAME}/FETCH_PROFILE_TASKS_FAILURE`;

export const FETCH_USER = `${MODULE_NAME}/FETCH_PROFILE`;
export const FETCH_USER_SUCCESS = `${MODULE_NAME}/FETCH_USER_SUCCESS`;
export const FETCH_USER_FAILURE = `${MODULE_NAME}/FETCH_USER_FAILURE`;




// actions profile info
export function fetchProfile(token) {
  return {
    type: FETCH_PROFILE,
    payload: { token },
  };
}

export function fetchProfileSuccess(profile) {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: { profile },
  };
}

export function fetchProfileFailure(response) {
  return {
    type: FETCH_PROFILE_FAILURE,
    payload: { status: response },
  };
}

//actions profile tasks
export function fetchProfileTasks(token, workerId, page, perPage) {
  return {
    type: FETCH_PROFILE_TASKS,
    payload: { token, workerId, page, perPage },
  };
}

export function fetchProfileTasksSuccess(profileTasks, totalTasks) {
  return {
    type: FETCH_PROFILE_TASKS_SUCCESS,
    payload: { profileTasks, totalTasks },
  };
}

export function fetchProfileTasksFailure(response) {
  return {
    type: FETCH_PROFILE_TASKS_FAILURE,
    payload: { status: response },
  };
}

// actions user info
export function fetchUser(token) {
  return {
    type: FETCH_USER,
    payload: { token },
  };
}

export function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { user },
  };
}

export function fetchUserFailure(response) {
  return {
    type: FETCH_USER_FAILURE,
    payload: { status: response },
  };
}


