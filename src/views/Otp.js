import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LoggedOutWrapper from './LoggedOutWrapper';
import styles from '../styles/auth.styles';
import { connect } from 'react-redux';
import { getOtpForm } from '../reducers';
import * as Actions from '../actions/OtpActions';

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

export default class Otp extends React.Component {
  componentDidMount () {
    ToastAndroid.show('Password has been sent to your Email ID', ToastAndroid.LONG)
  }

  render () {
    const {email, otp, errors, isSubmittingOtp} = this.props.form;
    return (
      <LoggedOutWrapper showLoader={isSubmittingOtp}>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.otpSentTo}>Password sent to</Text>
            <Text style={styles.otpSentToEmail}>{email}</Text>
          </View>
          <View style={styles.emailInputBar}>
            <View style={{padding: 10}}>
              <Icon
                name='ios-lock-outline'
                size={22}
                color='#5FC9FC'
                style={styles.iconOTP}
              />
            </View>
            <TextInput
              style={styles.emailInput}
              value={otp}
              placeholder="Enter the password"
              placeholderTextColor="#69CBF8"
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              keyboardType="numeric"
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) => this.props.onChange(text)}
              onSubmitEditing={() => this.props.onSubmit()}
            />
            <TouchableHighlight
              style={{padding: 10}}
              underlayColor="#22446C"
              onPress={this.props.onSubmit}
              >
              <Icon
                name="ios-arrow-forward-outline"
                size={22}
                color='#fff'
                style={styles.iconRightArrow}
              />
            </TouchableHighlight>
          </View>
          <Text style={[styles.emailNotFound, styles.otpError]}>{errors.otp && errors.otp.length ? errors.otp[0] : ''}</Text>
          <View style={styles.actionsContainer}>
            <TouchableHighlight onPress={this.props.onResend}>
              <Text style={styles.actionText}>Resend Password</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.props.onEditEmail}>
              <Text style={styles.actionText}>Change Email ID</Text>
            </TouchableHighlight>
          </View>
        </View>
      </LoggedOutWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  form: getOtpForm(state),
})

export default connect(mapStateToProps, {
  onChange: Actions.handleOnChangeOtp,
  onSubmit: Actions.handleOnSubmitOtp,
  onResend: Actions.handleResendOtp,
  onEditEmail: Actions.handleEditEmail,
})(Otp)
