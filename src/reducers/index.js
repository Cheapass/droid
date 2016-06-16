import { combineReducers } from 'redux';
import isLoggedIn, * as fromAuth from './auth';
import loginForm, * as fromLogin from './LoginReducers';
import otpForm, * as fromOtp from './OtpReducers';

export default combineReducers({
  isLoggedIn,
  loginForm,
  otpForm,
})

export const getIsLoggedIn = (state) =>
  fromAuth.getIsLoggedIn(state.isLoggedIn)

export const getLoginForm = (state) =>
  fromLogin.getLoginForm(state.loginForm)

export const getOtpForm = (state) =>
  fromOtp.getOtpForm(state.otpForm)
