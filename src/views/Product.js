import React, { PropTypes } from 'react';
import {
  getIsFetchingPriceHistory,
  getPriceHistory,
  getLeastPrice,
} from '../reducers/ProductReducers';

import {
  handleFetchPriceHistory,
  handleResetProduct,
} from '../actions/ProductActions';

import { connect } from 'react-redux';

import {
  View,
  Image,
  Text,
  TouchableNativeFeedback,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';

class Product extends React.Component {
  constructor() {
    super();
  }

  componentDidMount () {
    console.log(this.props);
    this.props.handleFetchPriceHistory({
      seller: this.props.sellerId,
      id: this.props._id,
    })
  }

  componentWillUnmount () {
    this.props.handleResetProduct();
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 72, paddingLeft: 12, paddingRight: 12, backgroundColor: '#fff'}}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
          <Image style={{width: 320, height: 200, marginBottom: 20}} resizeMode="contain" source={{uri: this.props.productImage}} />
          <Text style={{fontWeight: '500', fontSize: 18}}>{this.props.productName}</Text>
          { this.props.isFetching ?
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <ActivityIndicator />
              <Text>Fetching Least Price...</Text>
            </View> :
            <View>
              <Text>Least Price: Rs. {this.props.leastPrice}</Text>
            </View>
          }
        </View>
      </View>
    )
  }
}

Product.propTypes = {
  _id: PropTypes.string.isRequired,
  productURL: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  isFavourable: PropTypes.number.isRequired,
  seller: PropTypes.string.isRequired,
}

const mapStateToProps = ({product}) => ({
  isFetching: getIsFetchingPriceHistory(product),
  priceHistory: getPriceHistory(product),
  leastPrice: getLeastPrice(product),
})

export default connect(mapStateToProps, {
  handleFetchPriceHistory,
  handleResetProduct,
})(Product);
