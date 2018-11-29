import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { reducer as auth } from './auth/redux';
import { epics as authEpic} from './auth/epics';
import { reducer as tasks } from './main/redux';
import { epics as tasksEpic } from './main/epics';
import { reducer as profile} from "./profile/redux";
import { epics as profileEpic} from "./profile/epics";

const rootReducer = combineReducers({
  auth,
  tasks,
  profile,
});

const rootEpic = combineEpics(
  authEpic,
  tasksEpic,
  profileEpic
);

export {
  rootReducer,
  rootEpic,
}
