import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LoggedOutWrapper from './LoggedOutWrapper';
import styles from '../styles/auth.styles';
import { connect } from 'react-redux';
import { getIsLoggedIn, getLoginForm } from '../reducers';
import * as Actions from '../actions/LoginActions';

import {
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

class Login extends React.Component {
  render () {
    const {form: {email, errors}, autoFocus = false} = this.props;
    return (
      <LoggedOutWrapper showLoader={false}>
        <View style={styles.formContainer}>
          <View style={styles.emailInputBar}>
            <View style={{padding: 10}}>
              <Icon
                name='ios-mail'
                size={22}
                color='#5FC9FC'
                style={styles.iconEmail}
              />
            </View>

            <TextInput
              style={styles.emailInput}
              value={email}
              placeholder="Enter Email ID to Login"
              placeholderTextColor="#69CBF8"
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={autoFocus}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) => this.props.onChange(text)}
              onSubmitEditing={() => this.props.onSubmit()}
            />

            <TouchableHighlight style={{padding: 10}} underlayColor="#22446C">
              <Icon
                name="ios-arrow-forward-outline"
                size={22}
                color='#fff'
                style={styles.iconRightArrow}
              />
            </TouchableHighlight>
          </View>
          { Object.keys(errors).length ? (
            <Text style={styles.emailNotFound}>{errors.email[0]}</Text>
          ): null}
        </View>
      </LoggedOutWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
  form: getLoginForm(state),
})

export default connect(mapStateToProps, {
  onChange: Actions.handleOnChangeEmail,
  onSubmit: Actions.handleOnSubmitEmail,
})(Login)
