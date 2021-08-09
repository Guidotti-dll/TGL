import React, { useState } from 'react'
import { View } from 'react-native'

import { Type } from '../../Interfaces/game'
import Filter from '../../components/Filter'
import Header from '../../components/Header'
import { SubTitle, Title } from '../RecentGames/styles'
import { Container, FilterContainer } from './style'

const NewBet: React.FC = () => {
  const [filter, setFilter] = useState<Type>()
  return (
    <View>
      <Header />
      <Container>
        <FilterContainer>
          <Title>New bet for TGL</Title>
          <SubTitle>Choose a game</SubTitle>
          {/* <Filter setFilter={(filter: any) => setFilter(filter)} newBet /> */}
        </FilterContainer>
      </Container>
    </View>
  )
}

export default NewBet
