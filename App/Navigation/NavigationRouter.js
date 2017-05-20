import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

import TGWelcomeScreen from '../Containers/TGWelcomeScreen'
import TGSignUpTypeScreen from '../Containers/TGSignUpTypeScreen'
import TGUserSignUpScreen from '../Containers/TGUserSignUpScreen'
import TGSignUpConfirmationScreen from '../Containers/TGSignUpConfirmationScreen'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='launchScreen' component={LaunchScreen} title='LaunchScreen' />
            <Scene initial key='welcomeScreen' component={TGWelcomeScreen} title='Welcome' renderLeftButton={NavItems.hamburgerButton} type='reset' />
            <Scene key='signUpType' component={TGSignUpTypeScreen} title='Account Type' />
            <Scene key='userSignUpScreen' component={TGUserSignUpScreen} title='Create User Account' />
            <Scene key='signUpConfirmation' component={TGSignUpConfirmationScreen} title='Sign Up Confirmation' renderLeftButton={NavItems.hamburgerButton} />

          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
