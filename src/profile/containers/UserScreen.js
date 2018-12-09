import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOut } from '../../auth/actions';
import { fetchProfileTasks, fetchUser} from '../actions';
import UserScreen from "../components/UserScreen/UserScreen";

function mapStateToProps(state) {
  return {
    ...state.auth,
    ...state.user,
    ...state.profileTasks
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(
    {
      signOut,
      fetchUser,
      fetchProfileTasks
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);