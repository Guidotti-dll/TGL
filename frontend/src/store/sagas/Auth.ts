import { put, all, takeEvery, fork } from 'redux-saga/effects'
import { User } from '../../interfaceies/user'
import { loginSuccess, loginRequest, loginFailure, Types } from '../ducks/Auth'

export function* handleLogin({ payload }: ReturnType<typeof loginRequest>) {
  try {
    if (payload.email !== 'teste@test.com' || payload.password !== '12345678') {
      throw new Error('Usuário invalido')
    }
    const user: User = {
      name: 'lucas',
      email: payload.email,
      recentGames: [
        {
          type: 'Lotofácil',
          color: '#7F3992',
          price: 2.5,
          data: '2021-07-12',
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        },
        {
          type: 'Lotofácil',
          color: '#7F3992',
          price: 2.5,
          data: '2021-07-12',
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        },
        {
          type: 'Lotofácil',
          color: '#7F3992',
          price: 2.5,
          data: '2021-07-12',
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        },
        {
          type: 'Mega-Sena',
          color: '#01AC66',
          price: 4.5,
          data: '2021-07-12',
          numbers: [15, 13, 1, 3, 6, 9],
        },
        {
          type: 'Lotofácil',
          color: '#7F3992',
          price: 2.5,
          data: '2021-07-12',
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        },
        {
          type: 'Mega-Sena',
          color: '#01AC66',
          price: 4.5,
          data: '2021-07-12',
          numbers: [1, 2, 3, 4, 5, 6],
        },
        {
          type: 'Quina',
          color: '#F79C31',
          price: 2,
          data: '2021-07-12',
          numbers: [1, 2, 3, 4, 5],
        },
      ],
    }

    yield put(loginSuccess(user, '5456465645da465sd46a465ad'))
  } catch (error) {
    yield put(loginFailure(error.message))
  }
}
function* watchOnHandleLogin() {
  yield takeEvery(Types.LOGIN_REQUEST, handleLogin)
}

export default function* lyricsSaga() {
  yield all([fork(watchOnHandleLogin)])
}
