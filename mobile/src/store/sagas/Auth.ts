import { put, all, takeEvery, fork, call } from 'redux-saga/effects'

import { User } from '../../Interfaces/user'
import api from '../../services/api'
import { loginSuccess, loginRequest, loginFailure, Types } from '../ducks/Auth'
import { clearMyBets } from '../ducks/Bets'
import { clearCart } from '../ducks/Cart'

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
