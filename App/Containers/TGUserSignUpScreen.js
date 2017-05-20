// @flow

import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/TGUserSignUpScreenStyle'
import { ApplicationStyles } from '../Themes'
import { Metrics } from '../Themes'
import SignUpActions from '../Redux/TGSignUpRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

class UserSignUpScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptUserSignUp: PropTypes.func
  }

  state: {
    email: string,
    password: string,
    username: string,
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  isAttempting: boolean
  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      error: ''
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the signUp attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      if (newProps.error && newProps.error.length) {
        const error = Array.isArray(newProps.error) ? newProps.error[0] : newProps.error
        console.log('ERROR: ', error)
        this.setState({ error: error })
      } else {
        NavigationActions.signUpConfirmation()
      }
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressSignUp = () => {
    this.isAttempting = true
    let payload = this.state
    payload.is_restaurant = false
    // attempt a signUp - a saga is listening to pick it up from here.
    this.props.attemptUserSignUp(payload)
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangePasswordConfirmation = (text) => {
    this.setState({ passwordConfirmation: text })
  }

  handleChangeUsername = (text) => {
    console.log('USERNAME CHANGED')
    this.setState({ username: text })
  }

  handleFocus () {
    console.log('USERNAME FOCUSED')
  }

  renderErrors () {
    const { error } = this.state
    if (error) {
      console.log('ERROR: ', error)
      return error
    } else {
      return null
    }
  }

  render () {
    const { email, password, username, passwordConfirmation } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <Text style={ApplicationStyles.lightNotice} >
          New User Sign Up
        </Text>
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Full Name</Text>
            <TextInput
              ref='username'
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onFocus={() => this.handleFocus()}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='carl carl' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Email</Text>
            <TextInput
              ref='email'
              style={textInputStyle}
              value={email}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeEmail}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='someone@somewhere.com' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressSignUp}
              placeholder='clever_password2!$' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Password Confirmation</Text>
            <TextInput
              ref='passwordConfirmation'
              style={textInputStyle}
              value={passwordConfirmation}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePasswordConfirmation}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressSignUp}
              placeholder='' />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressSignUp}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={NavigationActions.pop}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={Styles.errorText}>
          {this.renderErrors()}
        </Text>

      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  // TODO: Line 238 should be state.signUp.fetching ??
  return {
    fetching: false,
    error: state.signUp.error,
    message: state.signUp.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptUserSignUp: (payload) => dispatch(SignUpActions.signUpRequest(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUpScreen)
