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
import {Images, Metrics, ApplicationStyles} from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'

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
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps>
        <Image source={Images.logo} style={[ApplicationStyles.topLogo, this.state.topLogo]} />
        <View style={Styles.welcomeSection}>
          <Text style={ApplicationStyles.lightNotice}>
            {this.props.user.email}
          </Text>
          <Text style={Styles.lightSectionText}>
            YOU HAVE LOGGED IN
          </Text>
        </View>
        <View style={Styles.welcomeSection}>
          {loggedIn ? this.renderLogoutButton() : this.renderLoginButton()}
        </View>
        <View style={Styles.welcomeSection}>
          <RoundedButton onPress={NavigationActions.tableList}>Browse Tables</RoundedButton>
        </View>

      </ScrollView>
    )
  }

  renderLoginButton () {
    return (
      <RoundedButton onPress={NavigationActions.login}>
        Wrong button
      </RoundedButton>
    )
  }

  renderLogoutButton () {
    return (
      <RoundedButton onPress={this.props.logout}>
        Correct button
      </RoundedButton>
    )
  }

}

const mapStateToProps = (state) => {
  const user = state.login.user
  return {
    loggedIn: isLoggedIn(state.login),
    user: { id: user.id, email: user.email }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
