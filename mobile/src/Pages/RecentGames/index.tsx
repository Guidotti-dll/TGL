import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Filter from '../../components/Filter'
import Header from '../../components/Header'
import { AppStore } from '../../store'
import { BetState, getBetsRequest, resetSuccess } from '../../store/ducks/Bets'
import { formatDate, formatMoney } from '../../utils/formatValue'
import {
  BetContainer,
  Container,
  FilterContainer,
  Line,
  Numbers,
  SubTitle,
  Title,
  DetailsText,
  TypeText,
  Details,
  GamesEmptyTitle,
  GamesEmptySubTitle,
  GamesEmpty,
} from './styles'

const RecentGames: React.FC = () => {
  const { myBets, actualPage } = useSelector<AppStore, BetState>(
    state => state.Bets,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetSuccess())
    if (myBets.length === 0) {
      dispatch(getBetsRequest(actualPage, myBets.length))
    }
  }, [])

  const handleChangePage = () => {
    dispatch(getBetsRequest(actualPage, myBets.length))
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Container>
        <FilterContainer>
          <Title>Recent games</Title>
          <SubTitle>Filters</SubTitle>
          <Filter />
        </FilterContainer>
        {myBets.length > 0 && (
          <FlatList
            data={myBets}
            keyExtractor={item => `${item.id}`}
            onEndReached={handleChangePage}
            renderItem={({ item }) => (
              <BetContainer>
                <Line color={item.color} />
                <Details>
                  <Numbers>{item.numbers}</Numbers>
                  <DetailsText>
                    {item.id} ---------
                    {formatDate(item.date)} - ({formatMoney(item.price)})
                  </DetailsText>
                  <TypeText color={item.color}>{item.type}</TypeText>
                </Details>
              </BetContainer>
            )}
          />
        )}
        {myBets.length === 0 && (
          <GamesEmpty>
            <GamesEmptyTitle>Você não possui jogos cadastrados</GamesEmptyTitle>
            <GamesEmptySubTitle>
              Aposte um pouco, só não ganha quem não joga!!
            </GamesEmptySubTitle>
          </GamesEmpty>
        )}
        {/* {filter && filteredGames.length === 0 && myBets.length > 0 && (
        <GamesEmpty>
          <GamesEmptySubTitle>Você não possui jogos cadastrados deste tipo </GamesEmptySubTitle>
          </GamesEmpty>
      )} */}
      </Container>
    </View>
  )
}

export default RecentGames
