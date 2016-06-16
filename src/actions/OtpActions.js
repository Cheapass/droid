import API from '../remote/apis';

export const HANDLE_CHANGE_OTP = 'HANDLE_CHANGE_OTP';
export const handleOnChangeOtp = (otp) => ({
  type: HANDLE_CHANGE_OTP,
  payload: {
    otp
  }
})

import LGTM from 'lgtm';
const otpValidator =
  LGTM.validator()
  .validates('otp')
    .required('Enter the OTP to view your Dashboard')
  .build();

import { getOtpForm, getLoginForm } from '../reducers';
import { AsyncStorage, ToastAndroid } from 'react-native';
import keys from '../config/keys';
import { Actions } from 'react-native-router-flux';

export const HANDLE_SUBMIT_OTP_REQUEST = 'HANDLE_SUBMIT_OTP_REQUEST';
export const HANDLE_SUBMIT_OTP_SUCCESS = 'HANDLE_SUBMIT_OTP_SUCCESS';
export const HANDLE_SUBMIT_OTP_FAILURE = 'HANDLE_SUBMIT_OTP_FAILURE';
export const handleOnSubmitOtp = () => {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_SUBMIT_OTP_REQUEST
    });

    const { email, otp } = getOtpForm(getState());

    otpValidator
    .validate({otp})
    .then(result => {
      if (!result.valid) {
        return dispatch({
          type: HANDLE_SUBMIT_OTP_FAILURE,
          errors: result.errors
        });
      }

      API
      .verifyOTP({email, 'verify_code': otp})
      .then(response => {
        if (response.status) {
          dispatch({
            type: HANDLE_SUBMIT_OTP_SUCCESS
          });
          AsyncStorage.setItem(keys.STORAGE_KEY_IS_LOGGED_IN, 'true');
          AsyncStorage.setItem(keys.STORAGE_KEY_EMAIL, email);
          return Actions.dashboard();
        }

        dispatch({
          type: HANDLE_SUBMIT_OTP_FAILURE,
          errors: {
            otp: ['Invalid OTP. Please try again.']
          }
        });
      });
    });
  };
}


export const HANDLE_RESEND_OTP_REQUEST = 'HANDLE_RESEND_OTP_REQUEST';
export const HANDLE_RESEND_OTP_SUCCESS = 'HANDLE_RESEND_OTP_SUCCESS';
export const HANDLE_RESEND_OTP_FAILURE = 'HANDLE_RESEND_OTP_FAILURE';
export const handleResendOtp = () => {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_RESEND_OTP_REQUEST
    });

    const { email } = getLoginForm(getState());

    API
    .requestOTP({email})
    .then((response) => {
      if (response.status === 'ok') {
        ToastAndroid.show('Password has been re-sent to your Email ID', ToastAndroid.LONG)

        return dispatch({
          type: HANDLE_RESEND_OTP_SUCCESS
        });
      }

      dispatch({
        type: HANDLE_RESEND_OTP_FAILURE
      });
    });
  };

}

export const HANDLE_EDIT_EMAIL = 'HANDLE_EDIT_EMAIL';
export const handleEditEmail = () => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_EDIT_EMAIL,
    });

    Actions.login();
  }
}
