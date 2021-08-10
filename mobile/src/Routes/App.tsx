import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

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
    screenOptions={{
      headerShown: false,
    }}
    tabBar={props => <MyTabBar {...props} />}
  >
    <AppTab.Screen name='Home' component={RecentGames} />
    <AppTab.Screen name='NewBetScreen' component={NewBetScreen} />
    <AppTab.Screen name='Account' component={RecentGames} />
  </AppTab.Navigator>
)

export default AppTabScreen
