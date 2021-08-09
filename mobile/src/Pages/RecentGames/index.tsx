/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Game } from '../../Interfaces/game'
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
  const [filters, setFilters] = useState<string[]>([])
  const [filteredGames, setFilteredGames] = useState(myBets)
  const dispatch = useDispatch()

  useEffect(() => {
    const games: Game[] = []
    if (filters.length > 0) {
      for (let index = 0; index < filters.length; index++) {
        games.push(...myBets.filter(game => game.type === filters[index]))
      }

      setFilteredGames(
        games|| myBets
      )
    } else {
      setFilteredGames(myBets)
    }
  }, [filters, myBets])

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
          <Filter setFilter={(filters: string[]) => setFilters(filters)} />
        </FilterContainer>
        {filteredGames.length > 0 && (
          <FlatList
            data={filteredGames}
            keyExtractor={item => `${item.id}`}
            onEndReached={handleChangePage}
            renderItem={({ item, index }) => (
              <BetContainer style={{marginTop: index === 0 ? 143 : 25}}>
                <Line color={item.color} />
                <Details>
                  <Numbers>{item.numbers}</Numbers>
                  <DetailsText>
                    {formatDate(item.date)} - ({formatMoney(item.price)})
                  </DetailsText>
                  <TypeText color={item.color}>{item.type}</TypeText>
                </Details>
              </BetContainer>
            )}
          />
        )}
        {filteredGames.length === 0 && filters.length === 0 && (
          <GamesEmpty>
            <GamesEmptyTitle>Você não possui jogos cadastrados</GamesEmptyTitle>
            <GamesEmptySubTitle>
              Aposte um pouco, só não ganha quem não joga!!
            </GamesEmptySubTitle>
          </GamesEmpty>
        )}
        {filters.length > 0 && filteredGames.length === 0 && (
          <GamesEmpty>
            <GamesEmptySubTitle>
              Você não possui jogos cadastrados deste(s) tipo(s){' '}
            </GamesEmptySubTitle>
          </GamesEmpty>
        )}
      </Container>
    </View>
  )
}

export default RecentGames
