import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingOverlay from './LoadingOverlay';
import Rupee from './Rupee';
import { connect } from 'react-redux';
import styles from '../styles/dashboard.styles';
import FCM from 'react-native-fcm';

import {
  getTracks,
  getIsFetchingTracks,
  getIsRefreshingTracks,
} from '../reducers';

import {
  handleFetchTracks,
  handleRegisterDevice,
} from '../actions/DashboardActions';

import {
  View,
  Image,
  Text,
  Dimensions,
  ListView,
  RefreshControl,
  TouchableNativeFeedback,
  Linking,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

// import SwipeableListView from 'SwipeableListView';
// import SwipeableQuickActions from 'SwipeableQuickActions';
// import SwipeableQuickActionButton from 'SwipeableQuickActionButton';


const EmptyDashboard = ({handleFetchTracks}) =>
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{marginBottom: 20}}>Uh oh! You're not tracking any items, yet.</Text>
    <TouchableNativeFeedback
      onPress={() => Linking.openURL('http://i.giphy.com/ReC7BctfZh25q.gif')}
      >
      <View style={{borderBottomWidth: 1, borderBottomColor: '#0B315B', marginBottom: 30}}>
        <Text>Quickly watch this video to get started!</Text>
      </View>
    </TouchableNativeFeedback>
    <TouchableNativeFeedback
      onPress={() => handleFetchTracks()}
      >
      <View style={{borderBottomWidth: 1, borderBottomColor: '#0B315B'}}>
        <Text>Added items? Tap to Refresh.</Text>
      </View>
    </TouchableNativeFeedback>
  </View>

class Dashboard extends React.Component {
  constructor () {
    super();
    this.state = {}
  }

  componentDidMount () {
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => this.onToken(token));
    this.refreshUnsubscribe = FCM.on('refreshToken', this.onToken);
    this.notificationUnsubscribe = FCM.on('notification', this.onNotification);

    this.setState({
      productNameDynamicWidth: {width: (Dimensions.get('window').width / 2) - 10}
    });

    this.props.handleFetchTracks();
  }

  componentWillUnmount() {
    // prevent leak
    this.refreshUnsubscribe();
    // this.notificationUnsubscribe();
  }

  onNotification (notif) {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    switch (notif.fcm.action) {
      case 'fcm.ACTION.PRICE_DROP_ALERT': {
        Alert.alert(
          'Price Drop Alert',
          `${notif.productName} is now available at Rs.${notif.currentPrice}/-`,
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Buy Now', onPress: () => Linking.openURL(notif.productURL)},
          ]
        )
      }
    }
  }

  onToken (token) {
    this.props.handleRegisterDevice(token);
  }

  renderTrack (track) {
    return (
      <TouchableNativeFeedback
        onPress={() => Actions.product(track)}
        background={TouchableNativeFeedback.SelectableBackground()}
        >
        <View style={styles.listItemContainer}>
          <View style={styles.listItemContainerLeftChild}>
            <Image style={styles.listItemLeftImage} resizeMode="contain" source={{uri: track.productImage}} />
          </View>
          <View style={styles.listItemContainerRightChild}>
            <View style={[styles.listItemProductNameContainer]}>
              <Text style={styles.productDetails}>{track.productName}</Text>
            </View>
            <View style={styles.listItemProductDetailsContainer}>
              <Text style={[styles.productDetails, styles.price]}>
                <Rupee amount={track.currentPrice} />
              </Text>
              <View style={[styles.sellerTag, !track.isFavourable ? styles.neutralBuy : track.isFavourable > 0 ? styles.favourableBuy : styles.unfavourableBuy]}>
                { track.isFavourable ? (
                  <Icon
                    name={track.isFavourable > 0 ? 'md-arrow-round-down' : 'md-arrow-round-up'}
                    size={14}
                    color="#fff"
                    style={{height: 14, width: 8, marginRight: 2}}
                  />
                ) : null}
                <Text style={styles.sellerName}>{track.seller}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  renderHeader () {
    return (
      <View style={styles.tracksHeader}>
        <Text style={styles.tracksHeaderText}>Product Details</Text>
        <Text style={styles.tracksHeaderText}>Current Price</Text>
      </View>
    );
  }

  // renderQuickActions () {
  //   return (
  //     <SwipeableQuickActions>
  //       <SwipeableQuickActionButton
  //         imageSource={require('./logo.png')}
  //         />
  //     </SwipeableQuickActions>
  //   )
  // }

  renderResults () {
    const { tracks, isRefreshing } = this.props;
    if (!Object.keys(tracks).length) {
      return <EmptyDashboard
        handleFetchTracks={this.props.handleFetchTracks}
        />;
    }

    // let ds = SwipeableListView.getNewDataSource();
    //
    const ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const listViewDataSource = ds.cloneWithRowsAndSections(
      {Products: Object.keys(tracks).map(id => tracks[id])}, ['Products']
    );

    return (
      <ListView
        bounceFirstRowOnMount={true}
        dataSource={listViewDataSource}
        renderSectionHeader={this.renderHeader}
        renderRow={this.renderTrack.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => this.props.handleFetchTracks(true)}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#fff"
          />
        }
      />
    );
  }

  render () {
    const { isFetching, isRefreshing } = this.props;
    return (
      <View style={styles.container} ref="containerView">
        { isFetching && !isRefreshing ?
          <LoadingOverlay isVisible={true} />:
          this.renderResults()
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  tracks: getTracks(state),
  isFetching: getIsFetchingTracks(state),
  isRefreshing: getIsRefreshingTracks(state),
})

export default connect(mapStateToProps, {
  handleFetchTracks,
  handleRegisterDevice,
})(Dashboard);
