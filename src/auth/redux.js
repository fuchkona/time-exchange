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

export const REGISTER_NEWUSER = 'REGISTER_NEWUSER';
export const REGISTER_NEWUSER_SUCCESS = 'REGISTER_NEWUSER_SUCCESS';
export const REGISTER_NEWUSER_FAILURE = 'REGISTER_NEWUSER_FAILURE';

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

    case 'REGISTER_NEWUSER':
      return {
        ...state,
        verifying: true,
      };

    case 'REGISTER_NEWUSER_SUCCESS':
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        verifying: false,
        auth: true,
      };

    case 'REGISTER_NEWUSER_FAILURE':
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

    case 'SIGNOUT_FAILURE':
      return state;

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

export function registerNewUser(fullname, username, password, email) {
  return {
    type: REGISTER_NEWUSER,
    payload: { fullname, username, password, email },
  };
}

export function registerNewUserSuccess(token) {
  return {
    type: REGISTER_NEWUSER_SUCCESS,
    payload: { token },
  };
}

export function registerNewUserFailure(response) {
  return {
    type: REGISTER_NEWUSER_FAILURE,
    payload: { status: response },
  };
}

export function signOut(token) {
  return {
    type: SIGNOUT,
    payload: { token },
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
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'back-exchange.herokuapp.com/api/site/login';
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

async function userRegister(fullname, username, password, email) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'back-exchange.herokuapp.com/api/site/signup';
    const body = {
      full_name: fullname,
      username,
      password,
      email,
    };
    const params = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    console.log(params);

    const blob = await fetch(proxyUrl + url, params);
    const data = await blob.json();

    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
}

async function userLogout(token) {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'back-exchange.herokuapp.com/api/site/logout';
    const params = {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    console.log(params);

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

function registerNewUserEpic(action$) {
  console.log(action$);
  return action$
    .ofType(REGISTER_NEWUSER)
    .pipe(
      mergeMap((payload) => {
        console.log(payload);
        return from(userRegister(payload.payload.fullname, payload.payload.username, payload.payload.password, payload.payload.email))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return registerNewUserSuccess(response.data.token);
        } else {
          return registerNewUserFailure(response);
        }
      }),
      catchError(error => {
        return of(registerNewUserFailure(error));
      })
    )
}

function signOutEpic(action$) {
  return action$
    .ofType(SIGNOUT)
    .pipe(
      mergeMap((payload) => {
        console.log(payload);
        return from(userLogout(payload.payload.token));
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          return signOutSuccess();
        } else {
          return signOutFailure(response);
        }
      }),
      catchError(error => {
        return of(signOutFailure(error));
      })
    )
}

export const epics = combineEpics(
  verifyUsernamePasswordEpic,
  registerNewUserEpic,
  signOutEpic,
);
