import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import { AppStackParamList } from '../../Routes/App'
import { colors } from '../../constants/colors'
import { logout } from '../../store/ducks/Auth'
import {
  HeaderContainer,
  IconsContainer,
  Logo,
  LogoLine,
  LogoText,
} from './styles'

export type HeaderProp = StackNavigationProp<AppStackParamList, 'NewBet'>

const Header: React.FC = () => {
  const dispatchRedux = useDispatch()
  const { navigate, dispatch } = useNavigation<HeaderProp>()
  const { name } = useRoute()

  const handleLogOut = () => {
    dispatchRedux(logout())
  }

  return (
    <HeaderContainer>
      <TouchableOpacity onPress={() => navigate('Home')}>
        <Logo>
          <LogoText>TGL</LogoText>
          <LogoLine />
        </Logo>
      </TouchableOpacity>

      <IconsContainer>
        {name === 'NewBet' && (
          <MaterialCommunityIcons
            name='cart-outline'
            size={26}
            color={colors.green}
            style={{ marginRight: 31 }}
            onPress={() => dispatch(DrawerActions.openDrawer())}
          />
        )}

        <Ionicons
          onPress={handleLogOut}
          name='exit-outline'
          size={25}
          color='#C1C1C1'
        />
      </IconsContainer>
    </HeaderContainer>
  )
}

export default Header
