import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfileScreen from '../components/ProfileScreen/ProfileScreen';
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
