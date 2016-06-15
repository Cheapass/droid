import * as Actions from '../actions/LoginActions';

const initialLoginForm = {
  email: '',
  errors: {},
}

const loginForm = (state = initialLoginForm, action) => {
  switch (action.type) {
    case Actions.HANDLE_ON_CHANGE_EMAIL: {
      return {
        ...state,
        email: action.payload.email
      }
    }

    case Actions.HANDLE_SUBMIT_EMAIL_FAILURE: {
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors
        }
      }
    }

    default:
      return state;
  }
}

export default loginForm;

export const getLoginForm = (state) => state;
