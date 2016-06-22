import {
  AsyncStorage
} from 'react-native';

import keys from '../config/keys';

import API from '../remote/apis';

import {
  getLoginForm
} from '../reducers';

export const HANDLE_FETCH_TRACKS_REQUEST = 'HANDLE_FETCH_TRACKS_REQUEST';
export const HANDLE_FETCH_TRACKS_SUCCESS = 'HANDLE_FETCH_TRACKS_SUCCESS';
export const HANDLE_FETCH_TRACKS_FAILURE = 'HANDLE_FETCH_TRACKS_FAILURE';
export const handleFetchTracks = (isRefresh = false) => (dispatch, getState) => {
  dispatch({
    type: HANDLE_FETCH_TRACKS_REQUEST,
    payload: {
      isRefresh
    }
  });

  API.getDashboard(
    getLoginForm(getState()).email
  ).then(response =>
    dispatch({
      type: HANDLE_FETCH_TRACKS_SUCCESS,
      payload: response
    })
  ).catch(() =>
    dispatch({
      type: HANDLE_FETCH_TRACKS_FAILURE
    })
  )
}

export const handleRegisterDevice = (token) => (dispatch, getState) => {
  API.requestAppInstallation({
    email: getLoginForm(getState()).email,
    token,
  })
  .then((response) => {
    if (response.status === 'ok') {
      AsyncStorage.setItem(keys.STORAGE_KEY_IS_INSTALLED, 'true');
    }
  })
  .catch(e => {
    console.log('exception caught in _handleAppInstallation ', e);
  });
}
