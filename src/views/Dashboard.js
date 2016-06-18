import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingOverlay from './LoadingOverlay';
import { connect } from 'react-redux';
import { getTracks, getIsFetchingTracks } from '../reducers';
import styles from '../styles/dashboard.styles';
import {
  handleFetchTracks
} from '../actions/DashboardActions';

import {
  View,
  ListView,
  Image,
  Text,
  Dimensions,
} from 'react-native';

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
          <View style={[styles.listItemProductNameContainer, this.state.productNameDynamicWidth]}>
            <Text style={styles.productDetails}>{track.productName}</Text>
          </View>
          <View style={styles.listItemProductDetailsContainer}>
            <Text style={[styles.productDetails, styles.price]}>₹{track.humanPrice}/-</Text>
            <View style={[styles.sellerTag, track.isFavourable ? styles.favourableBuy : styles.unfavourableBuy]}>
              <Icon
                name={track.isFavourable ? 'md-arrow-round-down' : 'md-arrow-round-up'}
                size={14}
                color="#fff"
                style={{height: 14, width: 8, marginRight: 2}}
              />
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

  renderResults () {
    const { tracks } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const listViewDataSource = ds.cloneWithRows(Object.keys(tracks).map(id => tracks[id]));
    return (
      <ListView
        enableEmptySections={true}
        dataSource={listViewDataSource}
        renderSectionHeader={this.renderHeader}
        renderRow={this.renderTrack.bind(this)}
        loadData={this.props.onReloadAlerts}

      />
    );
  }

  render () {
    const { isFetching } = this.props;
    return (
      <View style={styles.container} ref="containerView">
        { isFetching ?
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
})

export default connect(mapStateToProps, {
  handleFetchTracks
})(Dashboard);
