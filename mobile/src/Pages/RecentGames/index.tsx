import React from 'react'
import { View } from 'react-native'

import Filter from '../../components/Filter'
import Header from '../../components/Header'
import { Container, FilterContainer, SubTitle, Title } from './styles'

const RecentGames: React.FC = () => {
  return (
    <View>
      <Header />
      <Container>
        <FilterContainer>
          <Title>Recent games</Title>
          <SubTitle>Filters</SubTitle>
          <Filter />
        </FilterContainer>
      </Container>
    </View>
  )
}

export default RecentGames
