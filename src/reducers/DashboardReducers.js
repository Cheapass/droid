import * as Actions from '../actions/DashboardActions';
import { combineReducers } from 'redux';

const sellerMap = {
  flipkart: 'Flipkart',
  amazon: 'Amazon',
  zivame: 'Zivame',
  fabfurnish: 'FabFurnish',
  healthkart: 'HealthKart',
  jabong: 'Jabong',
  infibeam: 'Infibeam',
  snapdeal: 'Snapdeal',
  myntra: 'Myntra',
};

const numberWithCommas = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const isFetching = (state = false, action) => {
  switch (action.type) {
    case Actions.HANDLE_FETCH_TRACKS_REQUEST:
      return true;
    case Actions.HANDLE_FETCH_TRACKS_SUCCESS:
    case Actions.HANDLE_FETCH_TRACKS_FAILURE:
      return false;
    default:
      return state;
  }
}

const tracksById = (state = {}, action) => {
  switch (action.type) {
    case Actions.HANDLE_FETCH_TRACKS_SUCCESS: {
      return action.payload.map(sellerData =>
        sellerData.tracks.map(track => (
          {
            ...track,
            seller: sellerMap[sellerData.seller],
            isFavourable: track.alertToPrice ? track.currentPrice <= track.alertToPrice : true,
            humanPrice: numberWithCommas(track.currentPrice)
          }
        ))
      ).reduce((a, b) =>
        a.concat(b)
      ).reduce((byId, track) => {
        byId[track._id] = track;
        return byId;
      }, {})
    }

    default:
      return state;
  }
}

export default combineReducers({
  isFetching,
  tracksById
})

export const getIsFetching = (state) => state.isFetching;

export const getTracks = (state) => state.tracksById;
