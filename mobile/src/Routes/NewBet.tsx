import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'

import NewBet from '../Pages/NewBet'
import Cart from '../components/Cart'

const Drawer = createDrawerNavigator()

const NewBetScreen = () => {
  return (
    <Drawer.Navigator
      defaultStatus='open'
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerPosition: 'right',
        overlayColor: 'rgba(255, 255, 255, 0.8)',
      }}
      drawerContent={props => <Cart {...props} />}
    >
      <Drawer.Screen name='NewBet' component={NewBet} />
    </Drawer.Navigator>
  )
}

export default NewBetScreen
