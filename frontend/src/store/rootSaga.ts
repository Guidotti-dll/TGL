import { all, fork } from 'redux-saga/effects'

import Auth from './sagas/Auth'
import Bets from './sagas/Bets'

export default function* rootSaga() {
  yield all([fork(Auth), fork(Bets)])
}
