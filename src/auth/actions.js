const MODULE_NAME = 'AUTH';

export const VERIFY_USERNAME_PASSWORD = `${MODULE_NAME}/VERIFY_USERNAME_PASSWORD`;
export const VERIFY_USERNAME_PASSWORD_SUCCESS = `${MODULE_NAME}/VERIFY_USERNAME_PASSWORD_SUCCESS`;
export const VERIFY_USERNAME_PASSWORD_FAILURE = `${MODULE_NAME}/VERIFY_USERNAME_PASSWORD_FAILURE`;

export const REGISTER_NEWUSER = `${MODULE_NAME}/REGISTER_NEWUSER`;
export const REGISTER_NEWUSER_SUCCESS = `${MODULE_NAME}/REGISTER_NEWUSER_SUCCESS`;
export const REGISTER_NEWUSER_FAILURE = `${MODULE_NAME}/REGISTER_NEWUSER_FAILURE`;

export const SIGNOUT = `${MODULE_NAME}/SIGNOUT`;
export const SIGNOUT_SUCCESS = `${MODULE_NAME}/SIGNOUT_SUCCESS`;
export const SIGNOUT_FAILURE = `${MODULE_NAME}/SIGNOUT_FAILURE`;


export function verifyUsernamePassword(username, password, rememberMe = false) {   // TODO - передавать rememberMe из LoginScreen
  return {
    type: VERIFY_USERNAME_PASSWORD,
    payload: { username, password, rememberMe },
  };
}

export function verifyUsernamePasswordSuccess(token, id) {
  console.log('veryfy success', id);
  return {
    type: VERIFY_USERNAME_PASSWORD_SUCCESS,
    payload: { token, id },
  };
}

export function verifyUsernamePasswordFailure(response) {
  return {
    type: VERIFY_USERNAME_PASSWORD_FAILURE,
    payload: { status: response },
  };
}

export function registerNewUser(fullname, username, password, email) {
  return {
    type: REGISTER_NEWUSER,
    payload: { fullname, username, password, email },
  };
}

export function registerNewUserSuccess(token) {
  return {
    type: REGISTER_NEWUSER_SUCCESS,
    payload: { token },
  };
}

export function registerNewUserFailure(response) {
  return {
    type: REGISTER_NEWUSER_FAILURE,
    payload: { status: response },
  };
}

export function signOut(token) {
  return {
    type: SIGNOUT,
    payload: { token },
  };
}

export function signOutSuccess() {
  return {
    type: SIGNOUT_SUCCESS,
  };
}

export function signOutFailure() {
  return {
    type: SIGNOUT_FAILURE,
  };
}

