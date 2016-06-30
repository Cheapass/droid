import React, { PropTypes } from 'react';
import styles from '../styles/auth.styles';
import LoadingOverlay from './LoadingOverlay';

import {
  View,
  Image,
  Text,
} from 'react-native';

class LoggedOutWrapper extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image
          style={styles.logo}
          source={require('./logo.png')}
        />
        <Text style={styles.tagLine}>Simplest Price Drop Alerts via Push Notifications</Text>
        <View
          style={{flex: 1}}
          keyboardShouldPersistTaps={true}
          >
          {this.props.children}
        </View>
        { this.props.showLoader ?
          <LoadingOverlay isVisible={true} /> :
          null
        }
      </View>
    );
  }
}

LoggedOutWrapper.propTypes = {
  showLoader: PropTypes.bool.isRequired,
};

export default LoggedOutWrapper;
