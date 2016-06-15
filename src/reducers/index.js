import { combineReducers } from 'redux';
import isLoggedIn, * as fromAuth from './auth';
import loginForm, * as fromLogin from './LoginReducers';

export default combineReducers({
  isLoggedIn,
  loginForm,
})

export const getIsLoggedIn = (state) =>
  fromAuth.getIsLoggedIn(state.isLoggedIn)

export const getLoginForm = (state) =>
  fromLogin.getLoginForm(state.loginForm)
