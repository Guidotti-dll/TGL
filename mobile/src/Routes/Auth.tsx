import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import ForgotPassword from '../Pages/ForgotPassword'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'

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
    <AuthStack.Screen
      name='ForgotPassword'
      component={ForgotPassword}
      options={{ title: 'Forgot Password' }}
    />
    <AuthStack.Screen
      name='SignUp'
      component={SignUp}
      options={{ title: 'Sign Up' }}
    />
  </AuthStack.Navigator>
)

export default AuthStackScreen
