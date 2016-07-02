import * as ActionTypes from '../actions/ShareActions';

const initialShareState = {
  isOpen: true,
  isFetching: true,
  hasFailed: false,
  status: '',
  productName: '',
  productImage: '',
}

const share = (state = initialShareState, action) => {
  switch (action.type) {
    case ActionTypes.HANDLE_ADD_PRODUCT_SUCCESS: {
      const {payload: {status, productImage, productName, email}} = action;
      return {
        ...state,
        isFetching: false,
        hasFailed: false,
        status,
        productName,
        productImage,
        email,
      }
    }

    case ActionTypes.HANDLE_ADD_PRODUCT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        hasFailed: true,
        status: action.error,
      }
    }

    default:
      return state;
  }
}

export default share;

export const getIsFetching = (state) => state.isFetching;
export const getHasFailed = (state) => state.hasFailed;
export const getShareStatus = (state) => state.status;
export const getModalIsOpen = (state) => state.isOpen;
export const getProductDetails = (state) => ({
  name: state.productName,
  image: state.productImage,
  email: state.email,
})
