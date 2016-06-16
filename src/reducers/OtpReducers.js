import * as Actions from '../actions/OtpActions';
import * as LoginActions from '../actions/LoginActions';

const initialOtpForm = {
  email: '',
  otp: '',
  isSubmittingOtp: false,
  errors: {}
}

const otpForm = (state = initialOtpForm, action) => {
  switch (action.type) {
    case LoginActions.HANDLE_SUBMIT_EMAIL_SUCCESS: {
      return {
        ...state,
        email: action.payload.email
      }
    }

    case Actions.HANDLE_CHANGE_OTP: {
      return {
        ...state,
        otp: action.payload.otp,
        errors: {}
      }
    }

    case Actions.HANDLE_RESEND_OTP_REQUEST:
    case Actions.HANDLE_SUBMIT_OTP_REQUEST: {
      return {
        ...state,
        isSubmittingOtp: true,
      }
    }

    case Actions.HANDLE_RESEND_OTP_SUCCESS:
    case Actions.HANDLE_SUBMIT_OTP_SUCCESS: {
      return {
        ...state,
        isSubmittingOtp: false,
      }
    }

    case Actions.HANDLE_RESEND_OTP_FAILURE:
    case Actions.HANDLE_SUBMIT_OTP_FAILURE: {
      return {
        ...state,
        isSubmittingOtp: false,
        errors: {
          ...state.errors,
          ...action.errors,
        }
      }
    }

    default:
      return state;
  }
}

export default otpForm;

export const getOtpForm = (state) => state;
