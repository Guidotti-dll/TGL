import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import SignIn from '../Pages/SignIn'

const AuthStack = createStackNavigator()
export type AuthStackParamList = {
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
}

const AuthStackScreen: React.FC = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen
      name='SignIn'
      component={SignIn}
      options={{ title: 'Sign In' }}
    />
  </AuthStack.Navigator>
)

export default AuthStackScreen
