import * as Actions from '../actions/auth';

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case Actions.AUTH_LOGIN_SUCCESS:
      return true;
    case Actions.AUTH_LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default isLoggedIn;

export const getIsLoggedIn = (state) => state;
