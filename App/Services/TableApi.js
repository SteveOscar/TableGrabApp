// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://localhost:3000') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  console.log('IN TABLE API!!!')
  debugger
  const login = (email, password) => api.post('users/login', { email: email, password: password, password_confirmation: password })

  const signUp = (payload) => api.post('users', { user: payload })

  const getUserData = (email, password) => {
    api.post('users/login', { email: email, password: password })
  }

  return {
    login,
    signUp,
    getUserData
  }
}

export default {
  create
}
