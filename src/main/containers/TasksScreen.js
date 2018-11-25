import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TasksScreen from '../components/TasksScreen/TasksScreen';
import { signOut } from '../../auth/redux';

function mapStateToProps(state) {
  return {
    ...state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signOut,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksScreen);
