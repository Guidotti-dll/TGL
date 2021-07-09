import { put, all, takeEvery, fork } from 'redux-saga/effects'
import { User } from '../../interfaceies/user'
import { loginSuccess, loginRequest, loginFailure, Types } from '../ducks/Auth'

export function* handleLogin({ payload }: ReturnType<typeof loginRequest>) {
  console.log(payload.email, payload.password)
  try {
    const user: User = {
      name: 'lucas',
      email: 'lucas@test.com',
    }

    yield put(loginSuccess(user, '5456465645da465sd46a465ad'))
  } catch (error) {
    yield put(loginFailure(error.message))
  }
}
function* watchOnLoadLyrics() {
  yield takeEvery(Types.LOGIN_REQUEST, handleLogin)
}

export default function* lyricsSaga() {
  yield all([fork(watchOnLoadLyrics)])
}

// export default all([takeLatest(Types.LOGIN_REQUEST, handleLogin)])
