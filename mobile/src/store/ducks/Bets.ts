import { Reducer } from 'redux'

import { Game } from '../../Interfaces/game'

export const Types = {
  SAVE_BETS_REQUEST: 'bets/SAVE_BETS_REQUEST',
  SAVE_BETS_SUCCESS: 'bets/Save_BETS_SUCCESS',
  SAVE_BETS__FAILURE: 'bets/SAVE_BETS_fAILURE',
  GET_BETS_REQUEST: 'bets/GET_BETS',
  GET_BETS_SUCCESS: 'bets/GET_BETS_SUCCESS',
  GET_BETS_FAILURE: 'bets/GET_BETS_fAILURE',
  CLEAR_MY_BETS: 'bets/CLEAR_MY_BETS',
  RESET_SUCCESS: 'bets/RESET_SUCCESS',
}

interface GameFull extends Game {
  id: number
}
export interface BetState {
  myBets: GameFull[]
  actualPage: number
  loading: boolean
  error: string
  success: boolean
}

const initialState: BetState = {
  myBets: [],
  actualPage: 1,
  loading: false,
  error: '',
  success: false,
}

const reducer: Reducer<BetState> = (state = initialState, action) => {
  switch (action.type) {
    case Types.SAVE_BETS_REQUEST:
      return { ...state, loading: true }
    case Types.SAVE_BETS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      }
    case Types.SAVE_BETS__FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload.error,
      }
    case Types.GET_BETS_REQUEST:
      return { ...state, loading: true }
    case Types.GET_BETS_SUCCESS:
      return {
        ...state,
        loading: false,
        actualPage: action.payload.actualPage,
        success: true,
        error: '',
        myBets: [
          ...state.myBets,
          ...action.payload.bets.filter(
            (bet: Game) =>
              !state.myBets.find((myBet: Game) => myBet.id === bet.id),
          ),
        ],
      }
    case Types.GET_BETS_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload.error,
      }
    case Types.CLEAR_MY_BETS:
      return {
        myBets: [],
        loading: false,
        error: '',
        success: false,
        actualPage: 1,
      }
    case Types.RESET_SUCCESS:
      return { ...state, loading: false, success: false }

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

export const saveBetsSuccess = () => {
  return {
    type: Types.SAVE_BETS_SUCCESS,
  }
}
export const saveBetsFailure = (error: string) => {
  return {
    type: Types.SAVE_BETS__FAILURE,
    payload: { error },
  }
}

export const getBetsRequest = (page: number, total: number) => {
  return {
    type: Types.GET_BETS_REQUEST,
    payload: {
      page,
      total,
    },
  }
}

export const getBetsSuccess = (bets: Game[], actualPage: number) => {
  return {
    type: Types.GET_BETS_SUCCESS,
    payload: {
      bets,
      actualPage,
    },
  }
}
export const getBetsFailure = (error: string) => {
  return {
    type: Types.GET_BETS_FAILURE,
    payload: { error },
  }
}

export const clearMyBets = () => {
  return {
    type: Types.CLEAR_MY_BETS,
  }
}

export const resetSuccess = () => {
  return {
    type: Types.RESET_SUCCESS,
  }
}

export default reducer
