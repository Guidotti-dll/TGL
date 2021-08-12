import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from '@expo/vector-icons'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { colors } from '../../constants/colors'
import { useTypes } from '../../hooks/useTypes'
import { AppStore } from '../../store'
import { BetState, saveBetsRequest } from '../../store/ducks/Bets'
import { CartState, removeBet } from '../../store/ducks/Cart'
import { formatDate, formatMoney } from '../../utils/formatValue'
import {
  BetCard,
  BoldText,
  Container,
  Content,
  LineView,
  Details,
  Header,
  Line,
  SaveContainer,
  SlimText,
  Title,
  TotalContainer,
} from './styles'

const Cart = ({ navigation }: DrawerContentComponentProps) => {
  const { totalBetValue, bets } = useSelector<AppStore, CartState>(
    state => state.Cart,
  )
  const { error, success } = useSelector<AppStore, BetState>(
    state => state.Bets,
  )
  const { types } = useTypes()
  const dispatch = useDispatch()

  const deleteBetHandler = (index: number) => {
    dispatch(removeBet(index))
  }

  const saveBetHandler = () => {
    let minValue = 0
    bets.forEach(element => {
      const tempType = types.find(type => type.type === element.type)
      if (tempType!['min-cart-value'] > minValue) {
        minValue = tempType!['min-cart-value']
      }
    })
    if (minValue > totalBetValue) {
      alert(`O valor minimo deve ser de ${formatMoney(minValue)}`)
      return
    }
    dispatch(saveBetsRequest(bets))
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
    if (success) {
      navigation?.closeDrawer()
      navigation.navigate('Home')
    }
  }, [error, success])

  useEffect(() => {
    if (bets.length !== 0) {
      alert(
        'Quando você saiu esqueceu de salvar suas apostas, então as mantivemos para você',
      )
    }
  }, [])

  return (
    <Container>
      <Octicons
        name='x'
        size={20}
        color={colors.green}
        style={{ position: 'absolute', right: 20, top: 15 }}
        onPress={() => navigation?.closeDrawer()}
      />
      <Content>
        <Header>
          <MaterialCommunityIcons
            name='cart-outline'
            size={26}
            color={colors.green}
            style={{ marginRight: 12 }}
          />
          <Title>CART</Title>
        </Header>
        {bets.length > 0 && (
          <FlatList
            style={{ marginTop: 25, marginBottom: 10 }}
            data={bets}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <BetCard>
                <Line color={item.color} />
                <Details>
                  <BoldText>
                    {item.numbers
                      .sort((a: number, b: number) => a - b)
                      .join(', ')}
                  </BoldText>
                  <LineView>
                    <SlimText>
                      {formatDate(item.date)} - ({formatMoney(item.price)})
                    </SlimText>
                    <Feather
                      name='trash-2'
                      size={12}
                      color={colors.gray}
                      onPress={() => deleteBetHandler(index)}
                    />
                  </LineView>
                  <BoldText size={16} color={item.color}>
                    {item.type}
                  </BoldText>
                </Details>
              </BetCard>
            )}
          />
        )}
        {totalBetValue === 0 && (
          <BoldText style={{ marginTop: 12 }} size={17} color={colors.gray}>
            Cart Empty
          </BoldText>
        )}
        {totalBetValue > 0 && (
          <TotalContainer>
            <View style={{ flexDirection: 'row' }}>
              <BoldText size={15} color={colors.gray}>
                CART
              </BoldText>
              <SlimText style={{ fontSize: 15, marginLeft: 6 }}>
                TOTAL:
              </SlimText>
            </View>
            <BoldText size={15} color={colors.gray}>
              {formatMoney(totalBetValue)}
            </BoldText>
          </TotalContainer>
        )}
      </Content>
      {totalBetValue > 0 && (
        <SaveContainer>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={saveBetHandler}
          >
            <BoldText size={30} color={colors.green}>
              Save
            </BoldText>
            <AntDesign
              name='arrowright'
              size={24}
              color={colors.green}
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        </SaveContainer>
      )}
    </Container>
  )
}

export default Cart
