import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/ProductActions';

const isFetching = (state = true, action) => {
  switch (action.type) {
    case ActionTypes.HANDLE_FETCH_PRICE_HISTORY_REQUEST:
    case ActionTypes.HANDLE_RESET_PRODUCT:
    case 'REACT_NATIVE_ROUTER_FLUX_BACK_ACTION':
      return true;
    case ActionTypes.HANDLE_FETCH_PRICE_HISTORY_SUCCESS:
    case ActionTypes.HANDLE_FETCH_PRICE_HISTORY_FAILURE:
      return false;
    default:
      return state;
  }
}

const priceHistory = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.HANDLE_FETCH_PRICE_HISTORY_SUCCESS:
      return action.payload.response;
    case ActionTypes.HANDLE_RESET_PRODUCT:
    case 'REACT_NATIVE_ROUTER_FLUX_BACK_ACTION':
      return [];
    default: {
      return state;
    }
  }
}

export default combineReducers({
  isFetching,
  priceHistory,
});

export const getIsFetchingPriceHistory = (state) => state.isFetching;
export const getPriceHistory = (state) => state.priceHistory;
export const getLeastPrice = (state) => {
  if (!state.priceHistory.length) {
    return null;
  }

  return state.priceHistory.sort((a, b) => a.price - b.price)[0].price;
}
