import keys from '../config/keys';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export const INIT_APP_WITH_LOGIN = 'INIT_APP_WITH_LOGIN';
export const handleCheckLogin = () => dispatch => {
  AsyncStorage
  .getItem(keys.STORAGE_KEY_IS_LOGGED_IN)
  .then(isLoggedInValue => {
    if (isLoggedInValue === null || isLoggedInValue === 'false') {
      return dispatch({
        type: INIT_APP_WITH_LOGIN,
        payload: {
          login: false,
        }
      });
    }

    // user has a logged in session
    AsyncStorage
    .getItem(keys.STORAGE_KEY_EMAIL)
    .then((email) => {
      Actions.dashboard({email});
      dispatch({
        type: INIT_APP_WITH_LOGIN,
        payload: {
          login: true,
          email: email,
        }
      });
    })
  })
  .catch(() => {
    dispatch({
      type: INIT_APP_WITH_LOGIN,
      payload: {
        login: false,
      }
    });
  });
}
