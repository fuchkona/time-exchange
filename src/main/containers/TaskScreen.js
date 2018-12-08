import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskScreen from '../components/TaskScreen/TaskScreen';
import { createRequestModalToggle, createRequest } from '../../task/redux/Requests/actions';
import { fetchTasks } from '../actions';

function mapStateToProps(state) {
  return {
    ...state.auth,
    ...state.tasks,
    ...state.requests,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTasks,
      createRequestModalToggle,
      createRequest,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
