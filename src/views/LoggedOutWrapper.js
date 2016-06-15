import React, { PropTypes } from 'react';
import styles from '../styles/auth.styles';

import {
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';

class LoggedOutWrapper extends React.Component {
  componentDidMount () {
    StatusBar.setHidden(true, 'slide');
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image
          style={styles.logo}
          source={require('./logo.png')}
        />
        <Text style={styles.tagLine}>Simplest Price Drop Alerts via Push Notifications</Text>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps={true}
          >
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

LoggedOutWrapper.propTypes = {
  showLoader: PropTypes.bool.isRequired,
};

export default LoggedOutWrapper;
