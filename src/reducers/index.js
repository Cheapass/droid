import { combineReducers } from 'redux';
import isLoggedIn, * as fromAuth from './auth';

export default combineReducers({
  isLoggedIn
})

export const getIsLoggedIn = (state) =>
  fromAuth.getIsLoggedIn(state.isLoggedIn)
