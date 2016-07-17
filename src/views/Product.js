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
  ActivityIndicator,
} from 'react-native';

import Rupee from './Rupee';

class Product extends React.Component {
  constructor() {
    super();
  }

  componentDidMount () {
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
      alertToPrice,
      seller,
      productURL,
      fallbackProductURL,
    } = this.props;

    return (
      <View style={{flex: 1, position: 'relative'}}>
        <ScrollView
          style={{backgroundColor: '#fff'}}
          contentContainerStyle={{paddingLeft: 12, paddingRight: 12, paddingVertical: 72}}
          >
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: '500', fontSize: 18, marginBottom: 10}}>{productName}</Text>
            <Image style={{width: 320, height: 200, marginBottom: 20}} resizeMode="contain" source={{uri: productImage}} />
          </View>
          <View>
            { isFetching ?
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator />
                <Text> Getting Price Fluctuations...</Text>
              </View> :
              <View>
                { maxPrice && currentPrice < maxPrice ?
                  <View style={{alignItems: 'center', marginBottom: 24}}>
                    <Text style={{textAlign: 'center'}}>You could have paid</Text>
                    <Text style={{textDecorationLine: 'line-through', textAlign: 'center', fontSize: 18}}>
                      <Rupee amount={maxPrice} />
                    </Text>
                  </View> :
                  null
                }

                { alertToPrice ?
                  <View style={{alignItems: 'center', marginBottom: 24}}>
                    <Text style={{textAlign: 'center'}}>Last Price Drop</Text>
                    <Text style={{textAlign: 'center', fontSize: 18}}>
                      <Rupee amount={alertToPrice} />
                    </Text>
                  </View> :
                  null
                }

                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'}}>
                  { leastPrice ?
                    <View>
                      <Text style={{textAlign: 'center', fontSize: 16}}>
                        Best Price
                      </Text>
                      <Text style={{textAlign: 'center', fontSize: 26}}>
                         <Rupee amount={leastPrice} />
                      </Text>
                    </View> :
                    null
                  }

                  <View>
                    <Text style={{fontSize: 16}}>
                      Current Price
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: 26}}>
                      <Rupee amount={currentPrice} />
                    </Text>
                  </View>
                </View>
              </View>
            }
          </View>
        </ScrollView>

        <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <TouchableNativeFeedback
            onPress={() => Linking.canOpenURL(productURL).then(supported =>
              Linking.openURL(supported ? productURL : fallbackProductURL)
            )}>
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
