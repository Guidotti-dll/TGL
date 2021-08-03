import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import Routes from './src/Routes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#f7f7f7',
  },
})

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Routes />
      <StatusBar style='auto' />
    </View>
  )
}

export default App
