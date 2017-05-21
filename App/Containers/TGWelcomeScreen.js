// @flow

import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/TGWelcomeScreenStyle'
import { Images, Metrics, ApplicationStyles } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import I18n from 'react-native-i18n'

import RoundedButton from '../Components/RoundedButton'

class LoginScreen extends React.Component {
  state: {
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  render () {
    const { loggedIn } = this.props
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.welcomeSection}>
          <Text style={ApplicationStyles.lightNotice}>
            Welcome to TableGrab
          </Text>
          <Text style={Styles.errorText}>
            {this.renderErrors()}
          </Text>
        </View>
        <View style={Styles.welcomeSection}>
          {loggedIn ? this.renderLogoutButton() : this.renderLoginButton()}
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.signUpType}>Sign Up</RoundedButton>
        </View>

      </ScrollView>
    )
  }

  renderErrors () {
    const { error } = this.props
    if (error) {
      console.log('ERROR: ', error)
      return error
    } else {
      return null
    }
  }

  renderLoginButton () {
    return (
      <RoundedButton onPress={NavigationActions.login}>
        {I18n.t('signIn')}
      </RoundedButton>
    )
  }

  renderLogoutButton () {
    return (
      <RoundedButton onPress={this.props.logout}>
        {I18n.t('logOut')}
      </RoundedButton>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login),
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
