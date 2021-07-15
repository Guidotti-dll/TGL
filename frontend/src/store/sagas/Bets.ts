import { toast } from 'react-toastify'
import { put, all, takeEvery, fork } from 'redux-saga/effects'

import {
  saveBetsRequest,
  saveBetsSuccess,
  saveBetsFailure,
  Types,
} from '../ducks/Bets'
import { clearCart } from '../ducks/Cart'

export function* handleSaveBets({
  payload,
}: ReturnType<typeof saveBetsRequest>) {
  try {
    if (payload.bets.length === 0) {
      throw new Error('Não há apostas')
    }

    yield put(clearCart())
    yield put(saveBetsSuccess(payload.bets))
    toast.success('Suas apostas foram feitas com sucesso!')
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
