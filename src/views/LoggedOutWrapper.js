import React, { PropTypes } from 'react';
import styles from '../styles/auth.styles';

import {
  ScrollView,
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
        <ScrollView
          contentContainerStyle={{flex: 1}}
          contentOffset={this.props.scrollViewcontentOffset}
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
  scrollViewcontentOffset: PropTypes.object.isRequired
};

export default LoggedOutWrapper;
