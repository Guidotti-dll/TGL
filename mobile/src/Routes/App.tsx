import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import RecentGames from '../Pages/RecentGames'

const AppTab = createBottomTabNavigator()
export type AuthStackParamList = {
  RecentGames: undefined
}

const AppTabScreen: React.FC = () => (
  <AppTab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppTab.Screen name='RecentGames' component={RecentGames} />
  </AppTab.Navigator>
)

export default AppTabScreen
