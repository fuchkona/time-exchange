import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { epics as authEpic, reducer as auth } from './auth/redux';

const rootReducer = combineReducers({
  auth,
});

const rootEpic = combineEpics(
  authEpic,
);

export {
  rootReducer,
  rootEpic,
}
