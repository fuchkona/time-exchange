import { combineReducers } from 'redux';
import {
  FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultProfileState = {
  profile: '',
  fetching: false,
};

function profile(state = defaultProfileState, action) {
  switch(action.type) {
    case FETCH_PROFILE:
      console.log('reduc prof');
      return {
        ...state,
        fetching: true,
      };

    case FETCH_PROFILE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        profile: action.payload.profile,
        fetching: false,
      };

    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}

export const reducer = combineReducers({
  profile,
});
