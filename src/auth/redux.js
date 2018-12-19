import { combineReducers } from 'redux';
import cookie from 'react-cookie';
import {
  VERIFY_USERNAME_PASSWORD, VERIFY_USERNAME_PASSWORD_SUCCESS, VERIFY_USERNAME_PASSWORD_FAILURE,
  REGISTER_NEWUSER, REGISTER_NEWUSER_SUCCESS, REGISTER_NEWUSER_FAILURE,
  SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
  CLEAR_AUTH_ERRORS,
} from './actions';


// Function for reducer


// Reducers
const cookieSignIn = cookie.load('time-exchange-signin');

const defaultSignInState = {
  id: cookieSignIn ? cookieSignIn.id : null,
  token: cookieSignIn ? cookieSignIn.token : null,
  username: cookieSignIn ? cookieSignIn.username : null,
  errors: null,
  verifying: false,
  signingOut: false,
  auth: cookieSignIn ? true : false,
};

function signIn(state = defaultSignInState, action) {
  switch (action.type) {
    case VERIFY_USERNAME_PASSWORD:
      return {
        ...state,
        verifying: true,
        errors: null,
      };

    case VERIFY_USERNAME_PASSWORD_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        username: action.payload.username,
        verifying: false,
        auth: true,
      };

    case VERIFY_USERNAME_PASSWORD_FAILURE:
      console.log(action.payload.errors);
      return {
        ...state,
        errors: action.payload.errors,
        verifying: false,
        auth: false,
      };

    case REGISTER_NEWUSER:
      return {
        ...state,
        verifying: true,
        errors: null,
      };

    case REGISTER_NEWUSER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        username: action.payload.username,
        verifying: false,
        auth: true,
      };

    case REGISTER_NEWUSER_FAILURE:
      return {
        ...state,
        errors: action.payload.errors,
        verifying: false,
        auth: false,
      };

    case SIGNOUT:
      return {
        ...state,
        signingOut: true,
      };

    case SIGNOUT_SUCCESS:
      return {
        ...state,
        id: null,
        token: null,
        username: null,
        auth: false,
        signingOut: false,
      };

    case SIGNOUT_FAILURE:
      return {
        ...state,
        signingOut: false,
      };

    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: null,
      };

    default:
      return state;
  }
}


export const reducer = combineReducers({
  signIn,
});