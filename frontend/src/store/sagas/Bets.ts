import { put, all, takeEvery, fork } from 'redux-saga/effects'
import {
  saveBetsRequest,
  saveBetsSuccess,
  saveBetsFailure,
  Types,
} from '../ducks/Bets'
import { clearBet } from '../ducks/Cart'

export function* handleSaveBets({
  payload,
}: ReturnType<typeof saveBetsRequest>) {
  try {
    if (payload.bets.length === 0) {
      throw new Error('Não há apostas')
    }

    yield put(clearBet())
    yield put(saveBetsSuccess(payload.bets))
  } catch (error) {
    yield put(saveBetsFailure(error.message))
  }
}
function* watchOnHandleSaveBets() {
  yield takeEvery(Types.SAVE_BETS_REQUEST, handleSaveBets)
}

export default function* lyricsSaga() {
  yield all([fork(watchOnHandleSaveBets)])
}
