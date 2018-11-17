import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

// Actions


// Function for reducer


// Reducers
const defaultSignInState = {
  logInParams: {},
  errors: {},
  status: '',
  auth: false,
};

function signIn(state = defaultSignInState, action) {
  switch (action.type) {
    case 'AUTHENTICATE':
      return {
        ...state,
        auth: true,
      };

    case 'SIGNOUT':
      return {
        ...state,
        auth: false,
      };
      
    default:
      return state;
  }
}

export const reducer = combineReducers({
  signIn,
});

// Function for epic


// Epics


export const epics = combineEpics(

);
