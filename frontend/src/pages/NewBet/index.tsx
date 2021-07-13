import React from 'react'
import Cart from '../../components/Cart'
import Bet from '../../components/Bet'
import { NewBetContainer } from './style'

const NewBetPage: React.FC = () => {
  return (
    <NewBetContainer>
      <Bet />
      <Cart />
    </NewBetContainer>
  )
}

export default NewBetPage
