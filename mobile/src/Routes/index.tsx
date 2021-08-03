import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import AuthStackScreen from './Auth'

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  )
}

export default Routes
