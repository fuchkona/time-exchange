import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginScreen from '../components/LoginScreen/LoginScreen';
import { verifyUsernamePassword, registerNewUser, clearAuthErrors } from '../actions';

function mapStateToProps(state) {
    return {
        ...state.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            verifyUsernamePassword,
            registerNewUser,
            clearAuthErrors,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);