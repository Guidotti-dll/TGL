import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Provider } from 'react-redux'

import Routes from './src/Routes'
import store from './src/store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#f7f7f7',
  },
})

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <FlashMessage
          position='top'
          style={{ paddingTop: getStatusBarHeight() }}
        />
        <Routes />
        <StatusBar style='auto' />
      </View>
    </Provider>
  )
}

export default App
