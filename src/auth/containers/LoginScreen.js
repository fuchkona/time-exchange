import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginScreen from '../components/LoginScreen/LoginScreen';
import { verifyUsernamePassword } from '../redux';

function mapStateToProps(state) {
  return {
    ...state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      verifyUsernamePassword,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
