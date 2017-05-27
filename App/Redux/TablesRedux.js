// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tablesRequest: ['payload'],
  tablesSuccess: ['status'],
  tablesFailure: ['error'],
})

export const TablesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  error: null,
  message: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to get tables
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully fetched tables
export const success = (state: Object, { message }: Object) =>
  state.merge({ fetching: false, error: null, message })

// we've had a problem fetching tables
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TABLES_REQUEST]: request,
  [Types.TABLES_SUCCESS]: success,
  [Types.TABLES_FAILURE]: failure,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
// export const isLoggedIn = (loginState: Object) => loginState.user && loginState.user.email
