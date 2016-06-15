import API from '../remote/apis';

export const HANDLE_ON_CHANGE_EMAIL = 'HANDLE_ON_CHANGE_EMAIL';
export const handleOnChangeEmail = (email) => ({
  type: HANDLE_ON_CHANGE_EMAIL,
  payload: {email}
})

import LGTM from 'lgtm';
const emailValidator =
  LGTM.validator()
  .validates('email')
    .required('Enter your registered Email ID')
    .email('Enter a valid Email ID')
  .build();

import { getLoginForm } from '../reducers';
import { Actions } from 'react-native-router-flux';
export const HANDLE_SUBMIT_EMAIL_REQUEST = 'HANDLE_SUBMIT_EMAIL_REQUEST';
export const HANDLE_SUBMIT_EMAIL_SUCCESS = 'HANDLE_SUBMIT_EMAIL_SUCCESS';
export const HANDLE_SUBMIT_EMAIL_FAILURE = 'HANDLE_SUBMIT_EMAIL_FAILURE';
export const handleOnSubmitEmail = () => {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_SUBMIT_EMAIL_REQUEST
    });

    const { email } = getLoginForm(getState());

    emailValidator.validate({email})
    .then(result => {
      if (!result.valid) {
        return dispatch({
          type: HANDLE_SUBMIT_EMAIL_FAILURE,
          errors: result.errors
        });
      }

      API.requestOTP({email})
      .then(response => {
        if (response.status === 'error') {
          return dispatch({
            type: HANDLE_SUBMIT_EMAIL_FAILURE,
            errors: {
              email: ['Cannot Log In. Begin using Cheapass on the web and then come back!']
            }
          });
        }

        dispatch({
          type: HANDLE_SUBMIT_EMAIL_SUCCESS
        });

        Actions.dashboard();
      })
      .catch((e) => console.log('error caught in request OTP ', e));
    });
  };
}
