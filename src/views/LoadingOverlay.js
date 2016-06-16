import React, {PropTypes} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View
} from 'react-native';

class LoadingOverlay extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.props.isVisible} />
      </View>
    );
  }
}

LoadingOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

export default LoadingOverlay;
