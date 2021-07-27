import { Reducer } from 'redux'
import { Game } from '../../interfaceies/game'

export const Types = {
  SAVE_BETS_REQUEST: 'bets/SAVE_BETS',
  SAVE_BETS_SUCCESS: 'bets/LOGIN_SUCCESS',
  SAVE_BETS__FAILURE: 'bets/SAVE_BETS_fAILURE',
  GET_BETS_REQUEST: 'bets/GET_BETS',
  GET_BETS_SUCCESS: 'bets/GET_BETS_SUCCESS',
  GET_BETS_FAILURE: 'bets/GET_BETS_fAILURE',
  CLEAR_MY_BETS: 'bets/CLEAR_MY_BETS',
  RESET_SUCCESS: 'bets/RESET_SUCCESS',
}

export interface BetState {
  myNets: Game[]
  maxPages: number
  loading: boolean
  error: string
  success: boolean
}

const initialState: BetState = {
  myNets: [],
  maxPages: 0,
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
        myBets: state.myNets.push(...action.payload.bets),
      }
    case Types.SAVE_BETS__FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case Types.GET_BETS_REQUEST:
      return { ...state, loading: true }
    case Types.GET_BETS_SUCCESS:
      return {
        ...state,
        loading: false,
        maxPages: action.payload.maxPages,
        success: true,
        error: '',
        myBets: state.myNets.push(...action.payload.bets),
      }
    case Types.GET_BETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case Types.CLEAR_MY_BETS:
      return {
        myNets: [],
        loading: false,
        error: '',
        success: false,
        maxPages: 0,
      }
    case Types.RESET_SUCCESS:
      return { ...state, success: false }

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

export const getBetsRequest = (page: number) => {
  return {
    type: Types.GET_BETS_REQUEST,
    payload: {
      page,
    },
  }
}

export const getBetsSuccess = (bets: Game[], maxPages: number) => {
  return {
    type: Types.GET_BETS_SUCCESS,
    payload: {
      bets,
      maxPages,
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
