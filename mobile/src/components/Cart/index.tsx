import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from '@expo/vector-icons'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

import { colors } from '../../constants/colors'
import { AppStore } from '../../store'
import { CartState } from '../../store/ducks/Cart'
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
            data={bets}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
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
                      onPress={() => console.log(item)}
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
      <SaveContainer>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => console.log('save')}
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
    </Container>
  )
}

export default Cart
