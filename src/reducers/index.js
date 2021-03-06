import { combineReducers } from 'redux';
import loginForm, * as fromLogin from './LoginReducers';
import otpForm, * as fromOtp from './OtpReducers';
import logIn, * as fromAuth from './AuthReducers';
import dashboard, * as fromDashboard from './DashboardReducers';
import product, * as fromProduct from './ProductReducers';

export default combineReducers({
  loginForm,
  otpForm,
  logIn,
  dashboard,
  product,
})

export const getLoginForm = (state) =>
  fromLogin.getLoginForm(state.loginForm)

export const getOtpForm = (state) =>
  fromOtp.getOtpForm(state.otpForm)

export const getIsLoggedIn = (state) =>
  fromAuth.getIsLoggedIn(state.logIn)

export const getIsCheckingLogin = (state) =>
  fromAuth.getIsCheckingLogin(state.logIn)

export const getTracks = (state) =>
  fromDashboard.getTracks(state.dashboard)

export const getIsFetchingTracks = (state) =>
  fromDashboard.getIsFetching(state.dashboard)

export const getIsRefreshingTracks = (state) =>
  fromDashboard.getIsRefreshing(state.dashboard)

export const getIsFetchingPriceHistory = (state) =>
  fromProduct.getIsFetchingPriceHistory(state.product)

export const getPriceHistory = (state) =>
  fromProduct.getPriceHistory(state.product)

export const getLeastPrice = (state) =>
  fromProduct.getLeastPrice(state.product)

export const getProductDetails = (state) =>
  fromProduct.getProductDetails(state.product)
