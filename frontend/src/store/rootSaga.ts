import { all } from 'redux-saga/effects'

import Auth from './sagas/Auth'

export default function* rootSaga() {
  return yield* all([Auth])
}
