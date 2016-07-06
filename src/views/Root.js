import React from 'react';
import { Provider, connect } from 'react-redux';
import ConfigStore from '../store/ConfigStore';
const store = ConfigStore();
import {Scene, Router} from 'react-native-router-flux';
const RouterWithRedux = connect()(Router);
import Auth from './Auth';
import Login from './Login';
import Otp from './Otp';
import Dashboard from './Dashboard';
import Product from './Product';

import {
  StatusBar,
} from 'react-native';

class Root extends React.Component {
  componentDidMount () {
    StatusBar.setBackgroundColor('#0B315B');
    // StatusBar.setTranslucent(true);
  }

  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="login" component={Login} title="Login" hideNavBar={true} />
            <Scene key="auth" component={Auth} title="Auth" hideNavBar={true} initial={true} />
            <Scene key="otp" component={Otp} title="Verify" hideNavBar={true} />
            <Scene key="dashboard" component={Dashboard} title="Dashboard" hideNavBar={true} />
            <Scene key="product" component={Product} title="Product" hideNavBar={false} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}

export default Root;
