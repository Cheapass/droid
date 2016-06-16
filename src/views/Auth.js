import React from 'react';
import LoggedOutWrapper from './LoggedOutWrapper';
import { connect } from 'react-redux';
import { getIsCheckingLogin } from '../reducers';
import * as Actions from '../actions/AuthActions';

class Auth extends React.Component {
  componentDidMount () {
    this.props.checkLogin();
  }

  render () {
    const { isCheckingLogin } = this.props;
    return (
      <LoggedOutWrapper showLoader={isCheckingLogin} />
    )
  }
}

const mapStateToProps = (state) => ({
  isCheckingLogin: getIsCheckingLogin(state),
})

export default connect(mapStateToProps, {
  checkLogin: Actions.handleCheckLogin,
})(Auth)
