// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingTop: 70,
    backgroundColor: Colors.background
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  welcomeSection: {
    margin: 2,
    padding: 5,
  },
})
