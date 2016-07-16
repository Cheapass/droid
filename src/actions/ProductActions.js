import API from '../remote/apis';

export const HANDLE_FETCH_PRICE_HISTORY_REQUEST = 'HANDLE_FETCH_PRICE_HISTORY_REQUEST';
export const HANDLE_FETCH_PRICE_HISTORY_SUCCESS = 'HANDLE_FETCH_PRICE_HISTORY_SUCCESS';
export const HANDLE_FETCH_PRICE_HISTORY_FAILURE = 'HANDLE_FETCH_PRICE_HISTORY_FAILURE';
export const handleFetchPriceHistory = ({seller, id}) => dispatch => {
  API.getProductPriceHistory({
    seller,
    id,
  }).then(response => {
    dispatch({
      type: HANDLE_FETCH_PRICE_HISTORY_SUCCESS,
      payload: {
        response,
      },
    })
  }).catch(() => {
    dispatch({
      type: HANDLE_FETCH_PRICE_HISTORY_FAILURE
    })
  })
}

export const HANDLE_RESET_PRODUCT = 'HANDLE_RESET_PRODUCT';
export const handleResetProduct = () => ({
  type: HANDLE_RESET_PRODUCT
})

export const HANDLE_INITIALIZE_TRACK = 'HANDLE_INITIALIZE_TRACK';
export const handleInitializeTrack = (track) => ({
  type: HANDLE_INITIALIZE_TRACK,
  payload: {
    track,
  },
})

import { getProductDetails } from '../reducers';
export const handleDeleteProduct = () => (dispatch, getState) => {
  const { _id, sellerId } = getProductDetails(getState());
  console.log(_id, sellerId);
}
