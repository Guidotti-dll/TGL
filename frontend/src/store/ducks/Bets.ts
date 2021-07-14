import { Reducer } from 'redux'
import { Game } from '../../interfaceies/game'

export const Types = {
  SAVE_BETS: 'bets/SAVE_BETS',
}

export interface BetState {
  myNets: Game[]
}

const initialState: BetState = {
  myNets: [
    {
      type: 'Lotofácil',
      color: '#7F3992',
      price: 2.5,
      date: '2021-07-12',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      type: 'Lotofácil',
      color: '#7F3992',
      price: 2.5,
      date: '2021-07-12',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
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
      numbers: [15, 13, 1, 3, 6, 9],
    },
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
}

const reducer: Reducer<BetState> = (state = initialState, action) => {
  switch (action.type) {
    case Types.SAVE_BETS:
      return {
        ...state,
        bets: [...state.myNets, ...action.payload.bets],
      }

    default:
      return state
  }
}

export const SaveBets = (bets: Game[]) => {
  return {
    type: Types.SAVE_BETS,
    payload: {
      bets,
    },
  }
}

export default reducer
