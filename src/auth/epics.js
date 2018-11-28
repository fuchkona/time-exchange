import { combineEpics } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import cookie from 'react-cookie';
import {
  VERIFY_USERNAME_PASSWORD, REGISTER_NEWUSER, SIGNOUT,
  verifyUsernamePasswordSuccess, verifyUsernamePasswordFailure,
  registerNewUserSuccess, registerNewUserFailure,
  signOutSuccess, signOutFailure,
} from './actions';


// Function for epic
async function userAuth(username, password, rememberMe) {
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

    const response = await fetch(proxyUrl + url, params);
    const data = await response.json();
    data.rememberMe = rememberMe;

    console.log('userAuth', data);
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

    const response = await fetch(proxyUrl + url, params);
    const data = await response.json();

    console.log('userRegister', data);
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

    const response = await fetch(proxyUrl + url, params);
    const data = await response.json();

    console.log('userLogout', data);
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
        return from(userAuth(payload.payload.username, payload.payload.password, payload.payload.rememberMe))
      }),
      map(response => {
        console.log(response);
        if (response.success) {
          console.log('from inside epic', response);
          if (response.rememberMe) {
            cookie.save('time-exchange-token', response.data.token, { path: '/', maxAge: 600 });
          }
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
          cookie.remove('time-exchange-token');
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
