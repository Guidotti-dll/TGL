import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useDispatch, useSelector } from 'react-redux'

import { Game, Type } from '../../Interfaces/game'
import { GameButton, GameButtonText } from '../../components/Filter/styles'
import Header, { HeaderProp } from '../../components/Header'
import Loading from '../../components/Loading'
import { colors } from '../../constants/colors'
import { useTypes } from '../../hooks/useTypes'
import { AppStore } from '../../store'
import { BetState } from '../../store/ducks/Bets'
import { addBet } from '../../store/ducks/Cart'
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
  const { success, loading } = useSelector<AppStore, BetState>(
    state => state.Bets,
  )
  const dispatchRedux = useDispatch()
  const { dispatch } = useNavigation<HeaderProp>()
  const { types } = useTypes()
  const [filter, setFilter] = useState<Type>()
  const [numbers, setNumbers] = useState<number[]>([])
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

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

  const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const clearGameHandler = () => {
    setSelectedNumbers([])
  }

  const completeGameHandler = () => {
    let tempArray = selectedNumbers
    if (filter?.['max-number'] === tempArray.length) {
      tempArray = []
    }
    if (!filter) {
      showMessage({
        message: 'Alert',
        type: 'warning',
        description: 'Selecione um jogo antes para completa-lo',
        icon: 'warning',
      })
      return
    }
    while (filter?.['max-number'] > tempArray.length) {
      const selectedNumber = getRandomIntInclusive(0, filter?.range)
      const hasInArray = tempArray.some(item => {
        return item === selectedNumber
      })
      if (!hasInArray && selectedNumber !== 0) {
        tempArray.push(selectedNumber)
      }
    }
    setSelectedNumbers([...tempArray])
  }

  const addToCartHandler = () => {
    if (!filter) {
      showMessage({
        message: 'Alert',
        type: 'warning',
        description: 'Selecione um jogo antes para adicionar-lo ao carrinho',
        icon: 'warning',
      })
      return
    }
    if (filter!['max-number'] === selectedNumbers.length) {
      const newBet: Game = {
        game_id: filter.id,
        type: filter!.type,
        color: filter!.color,
        price: filter!.price,
        date: new Date().toISOString(),
        numbers: selectedNumbers.sort((a, b) => a - b),
      }
      dispatchRedux(addBet(newBet))
      clearGameHandler()
      dispatch(DrawerActions.openDrawer())
    } else {
      showMessage({
        message: 'Alert',
        type: 'warning',
        description: `Escolha ${selectedNumbers.length === 0 ? '' : 'mais'} ${
          filter!['max-number'] - selectedNumbers.length
        } números antes para adicionar o jogo ao carrinho`,
        icon: 'warning',
      })
    }
  }

  const handleChangeFilter = (type: Type) => {
    clearGameHandler()
    setFilter(prevState => (prevState === type ? undefined : type))
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

  useEffect(() => {
    if (success) {
      setFilter(undefined)
    }
  }, [success])

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {loading && <Loading />}
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
                <ActionButton onPress={completeGameHandler}>
                  <ActionText>Complete game</ActionText>
                </ActionButton>
                <ActionButton onPress={clearGameHandler}>
                  <ActionText>Clear game</ActionText>
                </ActionButton>
                <ActionButton invert onPress={addToCartHandler}>
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
            renderItem={({ item, index }) => (
              <NumberButton
                style={{
                  marginTop: index < 5 ? 300 : 10,
                  marginBottom: index > filter?.range - 5 ? 15 : 0,
                }}
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
