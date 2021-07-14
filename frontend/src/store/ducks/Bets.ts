import { Reducer } from 'redux'
import { Game } from '../../interfaceies/game'

export const Types = {
  SAVE_BETS_REQUEST: 'bets/SAVE_BETS',
  SAVE_BETS_SUCCESS: 'bets/LOGIN_SUCCESS',
  SAVE_BETS__FAILURE: 'bets/SAVE_BETS_fAILURE',
}

export interface BetState {
  myNets: Game[]
  loading: boolean
  error: string
}

const initialState: BetState = {
  myNets: [],
  loading: false,
  error: '',
}

const reducer: Reducer<BetState> = (state = initialState, action) => {
  switch (action.type) {
    // case Types.SAVE_BETS_REQUEST:
    //   return {
    //     ...state,
    //     bets: state.myNets.push(...action.payload.bets),
    //   }
    case Types.SAVE_BETS_REQUEST:
      return { ...state, loading: true }
    case Types.SAVE_BETS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        myBets: state.myNets.push(...action.payload.bets),
      }
    case Types.SAVE_BETS__FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        // user: {} as User,
      }

    default:
      return state
  }
}

export const saveBetsRequest = (bets: Game[]) => {
  return {
    type: Types.SAVE_BETS_REQUEST,
    payload: {
      bets,
    },
  }
}

export const saveBetsSuccess = (bets: Game[]) => {
  return {
    type: Types.SAVE_BETS_SUCCESS,
    payload: {
      bets,
    },
  }
}
export const saveBetsFailure = (error: string) => {
  return {
    type: Types.SAVE_BETS__FAILURE,
    payload: { error },
  }
}

export default reducer