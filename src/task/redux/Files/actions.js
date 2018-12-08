const MODULE_NAME = 'FILES';

export const FETCH_FILES = `${MODULE_NAME}/FETCH_FILES`;
export const FETCH_FILES_SUCCESS = `${MODULE_NAME}/FETCH_FILES_SUCCESS`;
export const FETCH_FILES_FAILURE = `${MODULE_NAME}/FETCH_FILES_FAILURE`;

export const CREATE_FILE = `${MODULE_NAME}/CREATE_FILE`;
export const CREATE_FILE_SUCCESS = `${MODULE_NAME}/CREATE_FILE_SUCCESS`;
export const CREATE_FILE_FAILURE = `${MODULE_NAME}/CREATE_FILE_FAILURE`;

export const DELETE_FILE = `${MODULE_NAME}/DELETE_FILE`;
export const DELETE_FILE_SUCCESS = `${MODULE_NAME}/DELETE_FILE_SUCCESS`;
export const DELETE_FILE_FAILURE = `${MODULE_NAME}/DELETE_FILE_FAILURE`;

export function fetchFiles(token, taskId) {
  return {
    type: FETCH_FILES,
    payload: { token, taskId },
  };
}

export function fetchFilesSuccess(files) {
  return {
    type: FETCH_FILES_SUCCESS,
    payload: { files },
  };
}

export function fetchFilesFailure(response) {
  return {
    type: FETCH_FILES_FAILURE,
    payload: { errors: response },
  };
}

export function createFile(token, fileDetails) {
  return {
    type: CREATE_FILE,
    payload: { token, fileDetails },
  };
}

export function createFileSuccess(file) {
  return {
    type: CREATE_FILE_SUCCESS,
    payload: { file },
  };
}

export function createFileFailure(response) {
  return {
    type: CREATE_FILE_FAILURE,
    payload: { errors: response },
  };
}

export function deleteFile(token, fileId) {
  return {
    type: DELETE_FILE,
    payload: { token, fileId },
  };
}

export function deleteFileSuccess(fileId) {
  return {
    type: DELETE_FILE_SUCCESS,
    payload: { fileId },
  };
}

export function deleteFileFailure(response) {
  return {
    type: DELETE_FILE_FAILURE,
    payload: { errors: response },
  };
}
