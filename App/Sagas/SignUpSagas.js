/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/
import { call, put } from 'redux-saga/effects'
import SignUpActions from '../Redux/TGSignUpRedux'
import { AsyncStorage } from 'react-native'

// attempts to sign up
export function * signUp (api, action) {
  const { payload } = action
  if (payload.password === '') {
    // dispatch failure
    yield put(SignUpActions.signUpFailure(['Password Required']))
  } else if(payload.name === '') {
    yield put(SignUpActions.signUpFailure(['Name Required']))
  } else {
    // dispatch successful signs up
    const response = yield call(api.signUp, payload)
    if (response.ok) {
      debugger
      try {
        console.log('Sign Up Successful: ', response.data.status)
      } catch (error) {
        console.log('ERROR: ', error)
      }
      yield put(SignUpActions.signUpSuccess(response.data.status))
    } else {
      const issue = response.data ? response.data : response.problem
      yield put(SignUpActions.signUpFailure(issue))
    }
  }
}
