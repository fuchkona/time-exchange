import { combineReducers } from 'redux';
import {
  FETCH_FILES,
  FETCH_FILES_SUCCESS,
  FETCH_FILES_FAILURE,
  CREATE_FILE_FAILURE,
  DELETE_FILE,
  CREATE_FILE_SUCCESS,
  CREATE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultFilesState = {
  files: [],
  fetching: true,
  addingFile: false,
  deletingFile: false,
  errors: null,
};

function files(state = defaultFilesState, action) {
  switch (action.type) {
    case FETCH_FILES:
      console.log('redux fetch files');
      return {
        ...state,
        files: [],
        errors: null,
        fetching: true,
      };

    case FETCH_FILES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        files: action.payload.files,
        fetching: false,
      };

    case FETCH_FILES_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.payload.errors,
      };

    case CREATE_FILE:
      return {
        ...state,
        addingFile: true,
      };

    case CREATE_FILE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        files: state.files.concat(action.payload.file),
        addingFile: false,
      };

    case CREATE_FILE_FAILURE:
      return {
        ...state,
        addingFile: false,
        errors: action.payload.errors,
      };

    case DELETE_FILE:
      return {
        ...state,
        deletingFile: true,
      };

    case DELETE_FILE_SUCCESS:
      console.log('delete file success', action.payload);
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.payload.fileId),
        deletingFile: false,
      };

    case DELETE_FILE_FAILURE:
      return {
        ...state,
        deletingFile: false,
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  files,
});
