import { combineReducers } from 'redux';
import loginForm, * as fromLogin from './LoginReducers';
import otpForm, * as fromOtp from './OtpReducers';
import logIn, * as fromAuth from './AuthReducers';

export default combineReducers({
  loginForm,
  otpForm,
  logIn,
})

export const getLoginForm = (state) =>
  fromLogin.getLoginForm(state.loginForm)

export const getOtpForm = (state) =>
  fromOtp.getOtpForm(state.otpForm)

export const getIsLoggedIn = (state) =>
  fromAuth.getIsLoggedIn(state.logIn)

export const getIsCheckingLogin = (state) =>
  fromAuth.getIsCheckingLogin(state.logIn)
