import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOut } from '../../auth/actions';
import {fetchProfile, fetchProfileChangePass, fetchProfileTasks, fetchProfileUpdate} from '../actions';
import ProfileScreen from "../components/ProfileScreen/ProfileScreen";

function mapStateToProps(state) {
  return {
    ...state.auth,
    ...state.profile,
    ...state.profileTasks
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(
    {
      signOut,
      fetchProfile,
      fetchProfileTasks,
      fetchProfileUpdate,
      fetchProfileChangePass
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

