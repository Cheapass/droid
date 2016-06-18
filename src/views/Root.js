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

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="auth" component={Auth} title="Auth" initial={true} hideNavBar={true} />
            <Scene key="login" component={Login} title="Login" hideNavBar={true} />
            <Scene key="otp" component={Otp} title="Verify" hideNavBar={true} />
            <Scene key="dashboard" component={Dashboard} title="Dashboard" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}

export default Root;
