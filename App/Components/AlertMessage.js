import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AlertMessageStyles'

export default class AlertMessage extends React.Component {
  static defaultProps = { show: true }

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool
  }

  render () {
    const { show, style } = this.props
    let messageComponent = null
    if (show) {
      const { title } = this.props
      return (
        <View
          style={[styles.container, style]}
        >
          <View style={styles.contentContainer}>
            <Text allowFontScaling={false} style={styles.message}>{title && title.toUpperCase()}</Text>
          </View>
        </View>
      )
    }

    return messageComponent
  }
}

AlertMessage.defaultProps = {
  show: true
}
