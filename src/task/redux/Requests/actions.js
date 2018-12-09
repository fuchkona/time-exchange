const MODULE_NAME = 'TASK';

export const FETCH_REQUESTS = `${MODULE_NAME}/FETCH_REQUESTS`;
export const FETCH_REQUESTS_SUCCESS = `${MODULE_NAME}/FETCH_REQUESTS_SUCCESS`;
export const FETCH_REQUESTS_FAILURE = `${MODULE_NAME}/FETCH_REQUESTS_FAILURE`;

export const CREATE_REQUEST_MODAL_TOGGLE = `${MODULE_NAME}/CREATE_REQUEST_MODAL_TOGGLE`;
export const CREATE_REQUEST = `${MODULE_NAME}/CREATE_REQUEST`;
export const CREATE_REQUEST_SUCCESS = `${MODULE_NAME}/CREATE_REQUEST_SUCCESS`;
export const CREATE_REQUEST_FAILURE = `${MODULE_NAME}/CREATE_REQUEST_FAILURE`;

export const DELETE_REQUEST = `${MODULE_NAME}/DELETE_REQUEST`;
export const DELETE_REQUEST_SUCCESS = `${MODULE_NAME}/DELETE_REQUEST_SUCCESS`;
export const DELETE_REQUEST_FAILURE = `${MODULE_NAME}/DELETE_REQUEST_FAILURE`;

export const ASSIGN_REQUEST = `${MODULE_NAME}/ASSIGN_REQUEST`;
export const ASSIGN_REQUEST_SUCCESS = `${MODULE_NAME}/ASSIGN_REQUEST_SUCCESS`;
export const ASSIGN_REQUEST_FAILURE = `${MODULE_NAME}/ASSIGN_REQUEST_FAILURE`;

export function fetchRequests(token, taskId) {
  return {
    type: FETCH_REQUESTS,
    payload: { token, taskId },
  };
}

export function fetchRequestsSuccess(requests) {
  return {
    type: FETCH_REQUESTS_SUCCESS,
    payload: { requests },
  };
}

export function fetchRequestsFailure(response) {
  return {
    type: FETCH_REQUESTS_FAILURE,
    payload: { errors: response },
  };
}

export function createRequestModalToggle() {
  return {
    type: CREATE_REQUEST_MODAL_TOGGLE,
  };
}

export function createRequest(token, requestDetails) {
  return {
    type: CREATE_REQUEST,
    payload: { token, requestDetails },
  };
}

export function createRequestSuccess(request) {
  return {
    type: CREATE_REQUEST_SUCCESS,
    payload: { request },
  };
}

export function createRequestFailure(response) {
  return {
    type: CREATE_REQUEST_FAILURE,
    payload: { errors: response },
  };
}

export function assignRequest(token, requestDetails) {
  return {
    type: ASSIGN_REQUEST,
    payload: { token, requestDetails },
  };
}

export function assignRequestSuccess() {
  return {
    type: ASSIGN_REQUEST_SUCCESS,
  };
}

export function assignRequestFailure(response) {
  return {
    type: ASSIGN_REQUEST_FAILURE,
    payload: { errors: response },
  };
}

export function deleteRequest(token, requestId) {
  return {
    type: DELETE_REQUEST,
    payload: { token, requestId },
  };
}

export function deleteRequestSuccess(requestId) {
  return {
    type: DELETE_REQUEST_SUCCESS,
    payload: { requestId },
  };
}

export function deleteRequestFailure(response) {
  return {
    type: DELETE_REQUEST_FAILURE,
    payload: { errors: response },
  };
}
