import { AxiosResponse } from 'axios'
import { put, all, takeEvery, fork, call } from 'redux-saga/effects'
import { Game, Type } from '../../interfaceies/game'
import { User } from '../../interfaceies/user'
import api from '../../services/api'
import { loginSuccess, loginRequest, loginFailure, Types } from '../ducks/Auth'
import { clearMyBets, saveBetsSuccess } from '../ducks/Bets'
import { clearCart } from '../ducks/Cart'

interface betRequest extends Game {
  game: Type
  // eslint-disable-next-line camelcase
  created_at: string
}

export function* handleLogin({ payload }: ReturnType<typeof loginRequest>) {
  try {
    const { data } = yield call(api.post, '/sessions', payload)
    api.defaults.headers.authorization = `Bearer ${data.token.token}`
    yield sessionStorage.setItem('token', data.token.token)
    const user: User = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
    }
    yield put(loginSuccess(user, data.token.token))

    const response: AxiosResponse = yield call(api.get, '/bets')

    const bets = response.data.data.map((bet: betRequest) => {
      return {
        type: bet.game.type,
        color: bet.game.color,
        date: bet.created_at,
        price: bet.price,
        numbers: bet.numbers,
      }
    })
    yield put(saveBetsSuccess(bets))
  } catch (error) {
    yield put(loginFailure(error.response.data.error.message))
  }
}

export function* handleLogout() {
  yield put(clearMyBets())
  yield put(clearCart())
}

function* watchOnHandleLogin() {
  yield takeEvery(Types.LOGIN_REQUEST, handleLogin)
}

function* watchOnHandleLogout() {
  yield takeEvery(Types.LOGOUT, handleLogout)
}

export default function* lyricsSaga() {
  yield all([fork(watchOnHandleLogin), fork(watchOnHandleLogout)])
}
