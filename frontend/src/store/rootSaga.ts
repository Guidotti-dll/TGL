import { all, fork } from 'redux-saga/effects'

import Auth from './sagas/Auth'

export default function* rootSaga() {
  yield all([fork(Auth)])
}
