import { Reducer } from 'redux'
import { Game } from '../../interfaceies/game'

export const Types = {
  ADD_BET: 'cart/ADD_BET',
  REMOVE_BET: 'cart/REMOVE_BET',
}

export interface CartState {
  bets: Game[]
  totalBetValue?: number
}

const initialState: CartState = {
  bets: [
    {
      type: 'Lotofácil',
      color: '#7F3992',
      price: 2.5,
      date: '2021-07-12',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      type: 'Mega-Sena',
      color: '#01AC66',
      price: 4.5,
      date: '2021-07-12',
      numbers: [1, 2, 3, 4, 5, 6],
    },
    {
      type: 'Quina',
      color: '#F79C31',
      price: 2,
      date: '2021-07-12',
      numbers: [1, 2, 3, 4, 5],
    },
  ],
  totalBetValue: 9,
}

const reducer: Reducer<CartState> = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_BET:
      return {
        ...state,
        bets: [...state.bets, action.payload.bet],
        totalBetValue: (state.totalBetValue += action.payload.bet.price),
      }
    case Types.REMOVE_BET:
      return {
        ...state,
        bets: state.bets?.splice(action.payload.index, 1),
      }
    default:
      return state
  }
}

export const addBet = (bet: Game) => {
  return {
    type: Types.ADD_BET,
    payload: {
      bet,
    },
  }
}

export const removeBet = (index: number) => {
  return {
    type: Types.REMOVE_BET,
    payload: {
      index,
    },
  }
}

export default reducer
