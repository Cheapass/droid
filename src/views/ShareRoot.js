import React from 'react';
import { Provider } from 'react-redux';
import ConfigStore from '../store/ShareConfigStore';
import ShareComponent from './ShareComponent';
const store = ConfigStore();

export default class Share extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ShareComponent />
      </Provider>
    )
  }
}
