import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

import { Type } from '../../Interfaces/game'
import { GameButton, GameButtonText } from '../../components/Filter/styles'
import Header from '../../components/Header'
import { useTypes } from '../../hooks/useTypes'
import { SubTitle, Title } from '../RecentGames/styles'
import {
  Container,
  DescriptionContainer,
  DescriptionText,
  DescriptionTitle,
  FilterContainer,
  Line,
  NumberButton,
  NumberText,
} from './style'

const NewBet: React.FC = () => {
  const { types } = useTypes()
  const [filter, setFilter] = useState<Type>()
  const [numbers, setNumbers] = useState<number[]>([])
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

  const handleChangeFilter = (type: Type) => {
    setFilter(prevState => (prevState === type ? undefined : type))
  }

  const isInArray = useCallback(
    (number: number) => {
      return selectedNumbers?.some(numberInArray => numberInArray === number)
    },
    [selectedNumbers],
  )

  const addNumberHandler = (number: number) => {
    if (isInArray(number)) {
      setSelectedNumbers(prevState =>
        prevState?.filter((numberInArray: number) => numberInArray !== number),
      )
    } else {
      if (filter && filter?.['max-number'] > selectedNumbers.length) {
        setSelectedNumbers(prevState => [...prevState, number])
      }
    }
  }

  useEffect(() => {
    if (filter) {
      const tempNumbers: number[] = []
      for (let index = 1; index <= filter.range; index++) {
        tempNumbers.push(index)
      }
      setNumbers(tempNumbers)
    } else {
      setNumbers([])
    }
  }, [filter])

  return (
    <View>
      <Header />
      <Container>
        <FilterContainer>
          <DescriptionContainer>
            <Title>New bet for {filter?.type || 'TGL'}</Title>
            <SubTitle>Choose a game</SubTitle>
          </DescriptionContainer>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator
            data={types}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <GameButton
                onPress={() => handleChangeFilter(item)}
                isSelected={filter?.type === item.type}
                color={item.color}
                key={item.id}
              >
                <GameButtonText
                  isSelected={filter?.type === item.type}
                  color={item.color}
                >
                  {item.type}
                </GameButtonText>
              </GameButton>
            )}
          />
          {filter && selectedNumbers.length === 0 && (
            <DescriptionContainer>
              <DescriptionTitle style={{ fontWeight: 'bold' }}>
                Fill your bet
              </DescriptionTitle>
              <DescriptionText>{filter?.description}</DescriptionText>
            </DescriptionContainer>
          )}
          <Line />
        </FilterContainer>
        {filter && (
          <FlatList
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
            data={numbers}
            keyExtractor={number => String(number)}
            numColumns={5}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <NumberButton
                onPress={() => addNumberHandler(item)}
                color={filter?.color}
                selected={isInArray(item)}
              >
                <NumberText>{item}</NumberText>
              </NumberButton>
            )}
          />
        )}
      </Container>
    </View>
  )
}

export default NewBet
