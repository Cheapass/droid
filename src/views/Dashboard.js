import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingOverlay from './LoadingOverlay';
import { connect } from 'react-redux';
import styles from '../styles/dashboard.styles';

import {
  getTracks,
  getIsFetchingTracks,
  getIsRefreshingTracks,
} from '../reducers';

import {
  handleFetchTracks
} from '../actions/DashboardActions';

import {
  View,
  Image,
  Text,
  Dimensions,
  ListView,
  RefreshControl,
} from 'react-native';

// import SwipeableListView from 'SwipeableListView';
import SwipeableQuickActions from 'SwipeableQuickActions';
import SwipeableQuickActionButton from 'SwipeableQuickActionButton';

class Dashboard extends React.Component {
  constructor () {
    super();
    this.state = {}
  }

  componentDidMount () {
    this.setState({
      productNameDynamicWidth: {width: (Dimensions.get('window').width / 2) - 10}
    });

    this.props.handleFetchTracks();
  }

  measureMainComponent () {
    this.refs.containerView.measure((ox, oy, width, height) => {
      const itemMargin = 0;
      const availableSpace = width - ( itemMargin * 4 );
      const itemWidth = Math.floor(availableSpace / 2);

      this.setState({
        rootViewWidth: width,
        rootViewHeight: height,
        itemWidth,
        itemMargin
      });
    });
  }

  renderTrack (track) {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.listItemContainerLeftChild}>
          <Image style={styles.listItemLeftImage} resizeMode="contain" source={{uri: track.productImage}} />
        </View>
        <View style={styles.listItemContainerRightChild}>
          <View style={[styles.listItemProductNameContainer]}>
            <Text style={styles.productDetails}>{track.productName}</Text>
          </View>
          <View style={styles.listItemProductDetailsContainer}>
            <Text style={[styles.productDetails, styles.price]}>₹{track.humanPrice}/-</Text>
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

  renderQuickActions () {
    return (
      <SwipeableQuickActions>
        <SwipeableQuickActionButton
          imageSource={require('./logo.png')}
          />
      </SwipeableQuickActions>
    )
  }

  renderResults () {
    const { tracks, isRefreshing } = this.props;
    if (!Object.keys(tracks).length) {
      return null;
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
        renderQuickActions={this.renderQuickActions}
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
  handleFetchTracks
})(Dashboard);
