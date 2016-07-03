import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'
import keys from '../config/keys';
import styles from '../styles/auth.styles';
import {
  Text,
  View,
  AsyncStorage,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

import {
  getModalIsOpen,
  getIsFetching,
  getHasFailed,
  getProductDetails,
  getShareStatus,
} from '../reducers/ShareReducers';

import {
  handleFetchProductDetails,
  handleInitializeShare,
} from '../actions/ShareActions';

class Share extends Component {
  async componentDidMount() {
    try {
      const uriPattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
      const { value } = await ShareExtension.data();
      const email = await AsyncStorage.getItem(keys.STORAGE_KEY_EMAIL);
      const urls = value.match(uriPattern);
      // console.log(urls);
      if (Array.isArray(urls) && urls.length) {
        this.props.handleInitializeShare({
          email,
          url: urls[0]
        });
      }

    } catch(e) {
      console.log('errrr', e)
    }
  }

  onClose() {
    ShareExtension.close()
  }

  render() {
    return (
      <Modal
        backdrop={false}
        style={{ backgroundColor: 'transparent' }}
        position="center"
        isOpen={this.props.isOpen}
        onClosed={this.onClose}
        >
        <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 }}>
          <View style={{ backgroundColor: 'rgba(0,0,0,0)', height: 240, width: 320 }}>
            <Image
              style={styles.logo}
              source={require('./logo.png')}
            />
            { this.props.isFetching ?
              <View style={{alignItems: 'center', justifyContent:'center', flex: 1}}>
                <Text style={{fontSize: 16, color: '#fff'}}>Hold on! Setting the alert...</Text>
              </View> :
              <View style={{alignItems: 'center', justifyContent:'center', flex: 1}}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 25,
                  color: '#fff',
                  marginBottom: 10,
                }}>
                {this.props.status}
                </Text>
                <Text>(Swipe down to dismiss)</Text>
              </View>
            }
          </View>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  isOpen: getModalIsOpen(state),
  isFetching: getIsFetching(state),
  hasFailed: getHasFailed(state),
  product: getProductDetails(state),
  status: getShareStatus(state),
})

export default connect(mapStateToProps, {
  handleFetchProductDetails,
  handleInitializeShare,
})(Share)
