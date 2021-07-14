import React from 'react'
import Cart from '../../components/Cart'
import Bet from '../../components/Bet'
import { NewBetContainer } from './style'
import { useTypes } from '../../hooks/useTypes'
import { Type } from '../../interfaceies/game'

export interface NewBetProps {
  types: Type[]
}

const NewBetPage: React.FC = () => {
  const { types } = useTypes()
  return (
    <NewBetContainer>
      <Bet types={types} />
      <Cart types={types} />
    </NewBetContainer>
  )
}

export default NewBetPage
