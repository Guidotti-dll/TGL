import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

import { Type } from '../../Interfaces/game'
import { GameButton, GameButtonText } from '../../components/Filter/styles'
import Header from '../../components/Header'
import { colors } from '../../constants/colors'
import { useTypes } from '../../hooks/useTypes'
import { SubTitle, Title } from '../RecentGames/styles'
import {
  ActionButton,
  Actions,
  ActionText,
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
          {filter && selectedNumbers.length > 0 && (
            <>
              <FlatList
                style={{
                  width: '100%',
                }}
                data={selectedNumbers}
                keyExtractor={number => String(number)}
                horizontal
                showsHorizontalScrollIndicator
                renderItem={({ item }) => (
                  <NumberButton
                    size={40}
                    onPress={() => addNumberHandler(item)}
                    color={filter?.color}
                    selected
                  >
                    <NumberText size={13}>{item}</NumberText>
                    <Octicons
                      name='x'
                      size={11}
                      color={colors.white}
                      style={{ position: 'absolute', right: 6, top: 5 }}
                    />
                  </NumberButton>
                )}
              />
              <Actions>
                <ActionButton>
                  <ActionText>Complete game</ActionText>
                </ActionButton>
                <ActionButton>
                  <ActionText>Clear game</ActionText>
                </ActionButton>
                <ActionButton invert>
                  <MaterialCommunityIcons
                    name='cart-outline'
                    size={18}
                    color={colors.white}
                    style={{ marginRight: 10 }}
                  />
                  <ActionText invert>Add to cart</ActionText>
                </ActionButton>
              </Actions>
            </>
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
