import { combineReducers } from 'redux';
import loginForm, * as fromLogin from './LoginReducers';
import otpForm, * as fromOtp from './OtpReducers';

export default combineReducers({
  loginForm,
  otpForm,
})

export const getLoginForm = (state) =>
  fromLogin.getLoginForm(state.loginForm)

export const getOtpForm = (state) =>
  fromOtp.getOtpForm(state.otpForm)
