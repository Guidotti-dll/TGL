import { Reducer } from 'redux'
import { Game } from '../../interfaceies/game'

export const Types = {
  ADD_BET: 'cart/ADD_BET',
  REMOVE_BET: 'cart/REMOVE_BET',
}

export interface CartState {
  bets: Game[]
  totalBetValue: number
}

const initialState: CartState = {
  bets: [],
  totalBetValue: 0,
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
        totalBetValue:
          state.totalBetValue - state.bets[action.payload.index].price,
        bets: state.bets?.filter(
          (bet, index) => index !== action.payload.index,
        ),
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
