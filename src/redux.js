import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { reducer as auth } from './auth/redux';
import { epics as authEpic} from './auth/epics';
import { reducer as tasks } from './main/redux';
import { epics as tasksEpic } from './main/epics';
import { reducer as profile} from "./profile/redux";
import { epics as profileEpic} from "./profile/epics";
import { reducer as user} from "./profile/redux";
import { epics as userEpic} from "./profile/epics";

import { reducer as comments} from "./task/redux/Comments/redux";
import { epics as commentsEpic} from "./task/redux/Comments/epics";

import { reducer as requests} from "./task/redux/Requests/redux";
import { epics as requestsEpic} from "./task/redux/Requests/epics";
import { reducer as files} from "./task/redux/Files/redux";
import { epics as filesEpic} from "./task/redux/Files/epics";


const rootReducer = combineReducers({
  auth,
  tasks,
  profile,
  user,
  comments,
  requests,
  files
});

const rootEpic = combineEpics(
  authEpic,
  tasksEpic,
  profileEpic,
  userEpic,
  commentsEpic,
  requestsEpic,
  filesEpic
);

export {
  rootReducer,
  rootEpic,
}
