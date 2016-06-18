import API from '../remote/apis';

import {
  getLoginForm
} from '../reducers';

export const HANDLE_FETCH_TRACKS_REQUEST = 'HANDLE_FETCH_TRACKS_REQUEST';
export const HANDLE_FETCH_TRACKS_SUCCESS = 'HANDLE_FETCH_TRACKS_SUCCESS';
export const HANDLE_FETCH_TRACKS_FAILURE = 'HANDLE_FETCH_TRACKS_FAILURE';
export const handleFetchTracks = () => (dispatch, getState) => {
  dispatch({
    type: HANDLE_FETCH_TRACKS_REQUEST
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
