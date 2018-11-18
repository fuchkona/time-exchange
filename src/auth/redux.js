import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';

import { from, of } from 'rxjs';


// Actions
export const VERIFY_USERNAME_PASSWORD = 'VERIFY_USERNAME_PASSWORD';
export const VERIFY_USERNAME_PASSWORD_SUCCESS = 'VERIFY_USERNAME_PASSWORD_SUCCESS';
export const VERIFY_USERNAME_PASSWORD_FAILURE = 'VERIFY_USERNAME_PASSWORD_FAILURE';

export const SIGNOUT = 'SIGNOUT';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const SIGNOUT_FAILURE = 'SIGNOUT_FAILURE';

// Function for reducer


// Reducers
const defaultSignInState = {
  token: '',
  errors: {},
  verifying: false,
  auth: false,
};

function signIn(state = defaultSignInState, action) {
  switch (action.type) {
    case 'VERIFY_USERNAME_PASSWORD':
      return {
        ...state,
        verifying: true,
      };

    case 'VERIFY_USERNAME_PASSWORD_SUCCESS':
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        verifying: false,
        auth: true,
      };

    case 'VERIFY_USERNAME_PASSWORD_FAILURE':
      return {
        ...state,
        status: action.payload.status,
        verifying: false,
        auth: false,
      };

    case 'SIGNOUT':
      return {
        ...state,
      };

    case 'SIGNOUT_SUCCESS':
      return {
        ...state,
        token: '',
        auth: false,
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  signIn,
});

export function verifyUsernamePassword(username, password) {
  return {
    type: VERIFY_USERNAME_PASSWORD,
    payload: { username, password },
  };
}

export function verifyUsernamePasswordSuccess(token) {
  return {
    type: VERIFY_USERNAME_PASSWORD_SUCCESS,
    payload: { token },
  };
}

export function verifyUsernamePasswordFailure(response) {
  return {
    type: VERIFY_USERNAME_PASSWORD_FAILURE,
    payload: { status: response },
  };
}

export function signOut() {
  return {
    type: SIGNOUT,
  };
}

export function signOutSuccess() {
  return {
    type: SIGNOUT_SUCCESS,
  };
}

export function signOutFailure() {
  return {
    type: SIGNOUT_FAILURE,
  };
}

// Function for epic
async function userAuth(username, password) {
  try {
    const proxyUrl = ''; // 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://back-exchange.herokuapp.com/api/site/login'; // 'back-exchange.herokuapp.com/api/site/login'
    const body = {
      username,
      password,
    };
    const params = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const blob = await fetch(proxyUrl + url, params);
    const data = await blob.json();

    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

// Epics
function verifyUsernamePasswordEpic(action$) {
  console.log(action$);
  return action$
    .ofType(VERIFY_USERNAME_PASSWORD)
    .pipe(
      mergeMap((payload) => {
        console.log(payload);
        return from(userAuth(payload.payload.username, payload.payload.password))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return verifyUsernamePasswordSuccess(response.data.token);
        } else {
          return verifyUsernamePasswordFailure(response);
        }
      }),
      catchError(error => {
        return of(verifyUsernamePasswordFailure(error));
      })
    )
}

function signOutEpic(action$) {
  return action$
    .ofType(SIGNOUT)
    .pipe(
      mergeMap((payload) => {
        return [signOutSuccess()];
      })
    )
}

export const epics = combineEpics(
  verifyUsernamePasswordEpic,
  signOutEpic,
);
