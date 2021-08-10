import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'

const Cart = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text onPress={() => navigation?.closeDrawer()}>Cart</Text>
    </View>
  )
}

export default Cart
