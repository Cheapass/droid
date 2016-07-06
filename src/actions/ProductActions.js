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
