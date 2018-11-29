import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TaskScreen from '../components/TaskScreen/TaskScreen';
import { signOut } from '../../auth/actions';

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

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
