import React, { Component } from 'react';

import {
  AppRegistry
} from 'react-native';

import Root from './src/views/Root';

class droid extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('droid', () => droid);
