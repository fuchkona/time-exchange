import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { epics as authEpic, reducer as auth } from './auth/redux';
import { epics as tasksEpic, reducer as tasks } from './main/redux';

const rootReducer = combineReducers({
  auth,
  tasks,
});

const rootEpic = combineEpics(
  authEpic,
  tasksEpic,
);

export {
  rootReducer,
  rootEpic,
}
