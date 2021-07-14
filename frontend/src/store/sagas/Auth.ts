import { put, all, takeEvery, fork } from 'redux-saga/effects'
import { User } from '../../interfaceies/user'
import { loginSuccess, loginRequest, loginFailure, Types } from '../ducks/Auth'
import { clearMyBets } from '../ducks/Bets'
import { clearCart } from '../ducks/Cart'

export function* handleLogin({ payload }: ReturnType<typeof loginRequest>) {
  try {
    if (payload.email !== 'teste@test.com' || payload.password !== '12345678') {
      throw new Error('Usuário invalido')
    }
    const user: User = {
      name: 'lucas',
      email: payload.email,
    }

    yield put(loginSuccess(user, '5456465645da465sd46a465ad'))
  } catch (error) {
    yield put(loginFailure(error.message))
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
