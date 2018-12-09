import { combineReducers } from 'redux';
import {
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_TASKS,
  FETCH_PROFILE_TASKS_SUCCESS,
  FETCH_PROFILE_TASKS_FAILURE, FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
} from './actions';

// Function for reducer


// Reducer
const defaultProfileState = {
  profile: '',
  fetching: false,
};

const defaultProfileTasks = {
  profileTasks: [],
  fetching: false,
};

const defaultUserState = {
  user: '',
  fetching: false,
};

function profile(state = defaultProfileState, action) {
  switch(action.type) {
    case FETCH_PROFILE:
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

function user(state = defaultUserState, action) {
  switch(action.type) {
    case FETCH_USER:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_USER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        fetching: false,
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}

function profileTasks(state = defaultProfileTasks, action) {
  switch (action.type) {
    case FETCH_PROFILE_TASKS:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_PROFILE_TASKS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        profileTasks: action.payload.profileTasks,
        totalTasks: action.payload.totalTasks,
        fetching: false,
      }

    case FETCH_PROFILE_TASKS_FAILURE:
      return {
        ...state,
        fetching: false,
      }

    default:
      return state;
  }
}




export const reducer = combineReducers({
  profile,
  profileTasks,
  user
});
