import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useDispatch } from 'react-redux'

import { logout } from '../../store/ducks/Auth'
import { HeaderContainer, Logo, LogoLine, LogoText } from './styles'

const Header: React.FC = () => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <HeaderContainer>
      <Logo>
        <LogoText>TGL</LogoText>
        <LogoLine />
      </Logo>
      <Ionicons
        onPress={handleLogOut}
        name='exit-outline'
        size={25}
        color='#C1C1C1'
      />
    </HeaderContainer>
  )
}

export default Header
