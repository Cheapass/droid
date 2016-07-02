import API from '../remote/apis';

export const HANDLE_ADD_PRODUCT_FAILURE = 'HANDLE_ADD_PRODUCT_FAILURE';
const handleFailure = (error) => ({
  type: HANDLE_ADD_PRODUCT_FAILURE,
  error
})

export const HANDLE_ADD_PRODUCT_SUCCESS = 'HANDLE_ADD_PRODUCT_SUCCESS';
const handleSuccess = (data) => ({
  type: HANDLE_ADD_PRODUCT_SUCCESS,
  payload: data
})

export const handleInitializeShare = ({email, url}) => dispatch => {
  API.addProduct({email, url})
  .then(response => {
    const { code, status } = response;
    if (code === 'error' || code === 'pending') {
      return dispatch(handleFailure(status))
    }

    if (code === 'verified') {
      const {productName, productImage} = response;
      return dispatch(handleSuccess({
        status,
        productName,
        productImage,
        email,
      }))
    }
  })
  .catch(e => {
    console.log('error handleInitializeShare => ', e);
    dispatch(handleFailure('Something went wrong!'))
  })
}
