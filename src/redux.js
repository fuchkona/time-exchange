import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { reducer as auth } from './auth/redux';
import { epics as authEpic} from './auth/epics';
import { reducer as tasks } from './main/redux';
import { epics as tasksEpic } from './main/epics';

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
