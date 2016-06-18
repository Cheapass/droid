import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
    // backgroundColor: '#0B315B'
  },
  tracksHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F1F3F5',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2
  },
  tracksHeaderText: {
    color: '#0E325A',
    opacity: 0.3,
    fontWeight: '500'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  listItemContainerLeftChild: {
    padding: 12
  },
  listItemLeftImage: {
    height: 60,
    width: 60
  },
  listItemContainerRightChild: {
    height: 100,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    padding: 12,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#CECED2'
  },
  listItemProductNameContainer: {
    width: 150,
    paddingRight: 6
  },
  productDetails: {
    // color: '#0E325A'
    // fontWeight: '500'
  },
  iconCart: {
    height: 60,
    width: 60,
    flex: 1
  },
  listItemProductDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  price: {
    marginBottom: 5
  },
  sellerTag: {
    padding: 3,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  favourableBuy: {
    backgroundColor: '#30C077'
  },
  unfavourableBuy: {
    backgroundColor: '#FD4B47'
  },
  sellerName: {
    color: '#fff',
    fontSize: 12
  }
});

export default styles;
