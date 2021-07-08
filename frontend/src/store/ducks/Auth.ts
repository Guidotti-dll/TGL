import { Reducer } from 'redux'
import { User } from '../../interfaceies/user'

export const Types = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'auth/FAILURE',
  LOGOUT: 'auth/LOGOUT',
}

export interface AuthState {
  isLogged: boolean
  token: string | null
  user: User | {}
  loading: boolean
  error: string
}

const initialState: AuthState = {
  isLogged: false,
  token: null,
  user: {},
  loading: false,
  error: '',
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true }
    case Types.LOGIN_SUCCESS:
      return { ...state, loading: false, error: '', user: action.payload.user }
    case Types.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload.error, user: {} }
    case Types.LOGOUT:
      return initialState
    default:
      return state
  }
}

export const loginRequest = (email: string, password: string) => {
  return {
    type: Types.LOGIN_REQUEST,
    payload: {
      email,
      password,
    },
  }
}

export const loginSuccess = (user: User, token: string) => {
  return {
    type: Types.LOGIN_SUCCESS,
    payload: {
      user,
      token,
    },
  }
}
export const loginFailure = (error: string) => {
  return {
    type: Types.LOGIN_FAILURE,
    payload: error,
  }
}

export const logout = () => {
  return {
    type: Types.LOGOUT,
  }
}

// export const loginRequest = (email: string, password: string) =>
//   action(Types.LOGIN_REQUEST, { email, password })

// export const loginSuccess = (email: string, password: string) =>
//   action(Types.LOGIN_REQUEST, { email, password })

// export const loginFailure = (error: string) =>
//   action(Types.LOGIN_REQUEST, { error })

export default reducer
