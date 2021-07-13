import React from 'react'
import Cart from '../../components/Cart'
import Game from '../../components/Game'
import { NewBetContainer } from './style'

const NewBetPage: React.FC = () => {
  return (
    <NewBetContainer>
      <Game />
      <Cart />
    </NewBetContainer>
  )
}

export default NewBetPage
