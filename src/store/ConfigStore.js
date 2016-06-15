import { createStore, applyMiddleware, combineReducers } from 'redux';
import CreateLogger from 'redux-logger';
const logger = CreateLogger();
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore () {
  const createStoreWithMiddleware = applyMiddleware(
    thunk, logger
  )(createStore);

  const store = createStoreWithMiddleware(combineReducers({
    ...rootReducer
  }))

  /*globals __DEV__ */
  if (__DEV__) {
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
