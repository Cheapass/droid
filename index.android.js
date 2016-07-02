import React, { Component } from 'react';

import {
  AppRegistry
} from 'react-native';

import Root from './src/views/Root';
import Share from './share.android';

class droid extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('droid', () => droid);
AppRegistry.registerComponent('CheapassShare', () => Share);
