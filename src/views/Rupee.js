import React from 'react';
import {
  Text
} from 'react-native';

const formatAmount = (amount) => {
  let x = Number(amount).toString();
  let afterPoint = '';
  if (x.indexOf('.') > 0) {
    afterPoint = x.substring(x.indexOf('.'), x.length);
  }
  x = Math.floor(x);
  x = x.toString();
  let lastThree = x.substring( x.length - 3 );
  let otherNumbers = x.substring( 0, x.length - 3 );
  if ( otherNumbers !== '' ) {
    lastThree = ',' + lastThree;
  }
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;
}

const Rupee = ({amount}) => {
  return (
    <Text>₹{formatAmount(amount)}/-</Text>
  )
}

export default Rupee;
