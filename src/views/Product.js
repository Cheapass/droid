import React, { PropTypes } from 'react';
import {
  getIsFetchingPriceHistory,
  getPriceHistory,
  getMinMaxPrices,
} from '../reducers/ProductReducers';

import {
  handleFetchPriceHistory,
  handleResetProduct,
} from '../actions/ProductActions';

import { connect } from 'react-redux';

import {
  View,
  ScrollView,
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
    const {
      productName,
      productImage,
      isFetching,
      leastPrice,
      currentPrice,
      maxPrice,
      seller,
    } = this.props;
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <ScrollView style={{paddingTop: 72, paddingLeft: 12, paddingRight: 12, backgroundColor: '#fff'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: '500', fontSize: 18, marginBottom: 10}}>{productName}</Text>
            <Image style={{width: 320, height: 200, marginBottom: 20}} resizeMode="contain" source={{uri: productImage}} />
          </View>
          <View>
            { isFetching ?
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <ActivityIndicator />
                <Text>Fetching Least Price...</Text>
              </View> :
              <View>
                <Text>
                  Price:
                  { currentPrice < maxPrice ?
                    <Text>
                      <Text> </Text>
                      <Text style={{textDecorationLine: 'line-through'}}>₹{maxPrice}</Text>
                    </Text> :
                    null
                  }
                  <Text> ₹{currentPrice}</Text>
                </Text>
                <Text>
                  Best Tracked Price: ₹{leastPrice}
                </Text>
              </View>
            }
          </View>
        </ScrollView>

        <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <TouchableNativeFeedback>
            <View style={{backgroundColor: '#2fbe6d', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{marginTop: 14, marginBottom: 14, color: '#fff', fontSize: 22, fontWeight: '500', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 1, textShadowColor: 'rgba(0,0,0,0.1)'}}>
                Get it on {seller}
              </Text>
            </View>
          </TouchableNativeFeedback>
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

const mapStateToProps = ({product}) => {
  const { min, max } = getMinMaxPrices(product);
  return {
    isFetching: getIsFetchingPriceHistory(product),
    priceHistory: getPriceHistory(product),
    leastPrice: min,
    maxPrice: max,
  }
}

export default connect(mapStateToProps, {
  handleFetchPriceHistory,
  handleResetProduct,
})(Product);
