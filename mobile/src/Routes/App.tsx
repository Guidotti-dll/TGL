import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import Account from '../Pages/Account'
import RecentGames from '../Pages/RecentGames'
import MyTabBar from '../components/TabNavigator'
import NewBetScreen from './NewBet'

const AppTab = createBottomTabNavigator()
export type AppStackParamList = {
  Home: undefined
  NewBet: undefined
}

const AppTabScreen: React.FC = () => (
  <AppTab.Navigator
    initialRouteName='Home'
    screenOptions={{
      headerShown: false,
    }}
    tabBar={props => <MyTabBar {...props} />}
  >
    <AppTab.Screen name='Home' component={RecentGames} />
    <AppTab.Screen name='NewBetScreen' component={NewBetScreen} />
    <AppTab.Screen name='Account' component={Account} />
  </AppTab.Navigator>
)

export default AppTabScreen
