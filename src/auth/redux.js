import { combineReducers } from 'redux';
import cookie from 'react-cookie';
import {
  VERIFY_USERNAME_PASSWORD, VERIFY_USERNAME_PASSWORD_SUCCESS, VERIFY_USERNAME_PASSWORD_FAILURE,
  REGISTER_NEWUSER, REGISTER_NEWUSER_SUCCESS, REGISTER_NEWUSER_FAILURE,
  SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
} from './actions';


// Function for reducer


// Reducers
const cookieSignIn = cookie.load('time-exchange-signin');

const defaultSignInState = {
  id: cookieSignIn ? cookieSignIn.id : null,
  token: cookieSignIn ? cookieSignIn.token : null,
  errors: {},
  verifying: false,
  auth: cookieSignIn ? true : false,
};

function signIn(state = defaultSignInState, action) {
  switch (action.type) {
    case VERIFY_USERNAME_PASSWORD:
      return {
        ...state,
        verifying: true,
      };

    case VERIFY_USERNAME_PASSWORD_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        id: action.payload.id,
        verifying: false,
        auth: true,
      };

    case VERIFY_USERNAME_PASSWORD_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        verifying: false,
        auth: false,
      };

    case REGISTER_NEWUSER:
      return {
        ...state,
        verifying: true,
      };

    case REGISTER_NEWUSER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        verifying: false,
        auth: true,
      };

    case REGISTER_NEWUSER_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        verifying: false,
        auth: false,
      };

    case SIGNOUT:
      return {
        ...state,
      };

    case SIGNOUT_SUCCESS:
      return {
        ...state,
        id: null,
        token: null,
        auth: false,
      };

    case SIGNOUT_FAILURE:
      return state;

    default:
      return state;
  }
}


export const reducer = combineReducers({
  signIn,
});
