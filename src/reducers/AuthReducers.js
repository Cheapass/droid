import * as OtpActions from '../actions/OtpActions';
import * as AuthActions from '../actions/AuthActions';

const logIn = (state = {
  isLoggedIn: false,
  isCheckingLogin: true,
}, action) => {
  switch (action.type) {
    case OtpActions.HANDLE_SUBMIT_OTP_SUCCESS:
      return {
        isLoggedIn: true,
        isCheckingLogin: false,
      };

    case AuthActions.INIT_APP_WITH_LOGIN:
      return {
        isCheckingLogin: false,
        isLoggedIn: action.payload.login,
      }

    default:
      return state;
  }
}

export default logIn;

export const getIsLoggedIn = (state) => state.isLoggedIn;
export const getIsCheckingLogin = (state) => state.isCheckingLogin;
