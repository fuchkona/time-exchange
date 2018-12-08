import { combineReducers } from 'redux';
import {
  FETCH_REQUESTS, FETCH_REQUESTS_SUCCESS, FETCH_REQUESTS_FAILURE,
  CREATE_REQUEST_MODAL_TOGGLE, CREATE_REQUEST, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAILURE,
  DELETE_REQUEST, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE,
  ASSIGN_REQUEST, ASSIGN_REQUEST_SUCCESS, ASSIGN_REQUEST_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultRequestsState = {
  requests: [],
  fetching: false,
  creatingRequest: false,
  assigningRequest: false,
  deletingRequest: false,
  errors: null,
  modalCreateRequestOpen: false,
};

function requests(state = defaultRequestsState, action) {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        ...state,
        requests: [],
        fetching: true,
      };

    case FETCH_REQUESTS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        requests: action.payload.requests,
        fetching: false,
      };

    case FETCH_REQUESTS_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.payload.errors,
      };

    case CREATE_REQUEST_MODAL_TOGGLE:
      return {
        ...state,
        modalCreateRequestOpen: !state.modalCreateRequestOpen,
      };

    case CREATE_REQUEST:
      return {
        ...state,
        creatingRequest: true,
      };

    case CREATE_REQUEST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        creatingRequest: false,
        requests: state.requests.concat(action.payload.request),
        modalCreateRequestOpen: false,
      };

    case CREATE_REQUEST_FAILURE:
      return {
        ...state,
        creatingRequest: false,
        errors: action.payload.errors,
      };

    case DELETE_REQUEST:
      return {
        ...state,
        deletingRequest: true,
      };

    case DELETE_REQUEST_SUCCESS:
      console.log('delete request success', action.payload);
      return {
        ...state,
        requests: state.requests.filter((request) => request.id !== action.payload.requestId),
        deletingRequest: false,
      };

    case DELETE_REQUEST_FAILURE:
      return {
        ...state,
        deletingRequest: false,
        errors: action.payload.errors,
      };

    case ASSIGN_REQUEST:
      return {
        ...state,
        assigningRequest: true,
      };

    case ASSIGN_REQUEST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        assigningRequest: false,
        requests: state.requests.concat(action.payload.request), // TODO - исправить как
      };

    case ASSIGN_REQUEST_FAILURE:
      return {
        ...state,
        assigningRequest: false,
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  requests,
});
