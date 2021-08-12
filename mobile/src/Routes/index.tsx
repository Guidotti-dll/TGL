import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useSelector } from 'react-redux'

import Loading from '../components/Loading'
import { AppStore } from '../store'
import { AuthState } from '../store/ducks/Auth'
import AppTabScreen from './App'
import AuthStackScreen from './Auth'

const Routes: React.FC = () => {
  const { isLogged, loading } = useSelector<AppStore, AuthState>(
    state => state.Auth,
  )
  return (
    <NavigationContainer>
      {loading && <Loading />}
      {isLogged ? <AppTabScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  )
}

export default Routes
