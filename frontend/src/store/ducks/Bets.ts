import { Reducer } from 'redux'
import { Game } from '../../interfaceies/game'

export const Types = {
  SAVE_BETS: 'bets/SAVE_BETS',
}

export interface BetState {
  myNets: Game[]
}

const initialState: BetState = {
  myNets: [],
}

const reducer: Reducer<BetState> = (state = initialState, action) => {
  switch (action.type) {
    case Types.SAVE_BETS:
      return {
        ...state,
        bets: state.myNets.push(...action.payload.bets),
      }

    default:
      return state
  }
}

export const saveBets = (bets: Game[]) => {
  return {
    type: Types.SAVE_BETS,
    payload: {
      bets,
    },
  }
}

export default reducer
