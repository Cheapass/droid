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

const isRefreshing = (state = false, action) => {
  switch (action.type) {
    case Actions.HANDLE_FETCH_TRACKS_REQUEST:
      if (action.payload.isRefresh) {
        return true;
      }
      return false;
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
            sellerId: sellerData.seller,
            seller: sellerMap[sellerData.seller],
            isFavourable: track.alertToPrice ? track.currentPrice <= track.alertToPrice ? 1 : -1 : 0,
            productURL: sellerData.seller === 'amazon' ? `com.amazon.mobile.shopping://${track.productURL.replace('http://', '').replace('/dp/', '/products/')}` : track.productURL,
            productImage: track.productImage ? track.productImage : 'http://vsnats.org/wp/wp-content/uploads/IMAGE_UNAVAILABLE_2100hires.jpg',
            fallbackProductURL: track.productURL,
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
  isRefreshing,
  tracksById,
})

export const getIsFetching = (state) => state.isFetching;

export const getTracks = (state) => state.tracksById;

export const getIsRefreshing = (state) => state.isRefreshing;
