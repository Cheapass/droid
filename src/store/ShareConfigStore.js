import { createStore, applyMiddleware, compose } from 'redux';
import CreateLogger from 'redux-logger';
const logger = CreateLogger();
import thunk from 'redux-thunk';
import rootReducer from '../reducers/ShareReducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, logger)
)(createStore);

export default function configureStore () {
  const store = createStoreWithMiddleware(rootReducer);

  /*globals __DEV__ */
  if (__DEV__) {
    module.hot.accept('../reducers/ShareReducers', () => {
      const nextRootReducer = require('../reducers/ShareReducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
