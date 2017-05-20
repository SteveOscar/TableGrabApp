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
import {Images, Metrics} from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'

import RoundedButton from '../Components/RoundedButton'

class SignUpTypeScreen extends React.Component {
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
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.welcomeSection}>
          <Text style={Styles.lightSectionText}>
            Which kind of account?
          </Text>
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.userSignUpScreen}>User</RoundedButton>
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.restaurantSignUpScreen}>Restaurant</RoundedButton>
        </View>

      </ScrollView>
    )
  }

  renderErrors () {
    const { error } = this.props
    if (error) {
      return 'Login Failed'
    } else {
      return null
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpTypeScreen)
