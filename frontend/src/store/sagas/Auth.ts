import { put, all, takeLatest } from 'redux-saga/effects'
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
    yield put(loginFailure('erro no login'))
  }
}

export default all([takeLatest(Types.LOGIN_REQUEST, handleLogin)])
