import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOut } from '../../auth/actions';
import { fetchProfile } from '../actions';
import ProfileScreen from "../components/ProfileScreen/ProfileScreen";

function mapStateToProps(state) {
  return {
    ...state.auth,
    ...state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signOut,
      fetchProfile,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

