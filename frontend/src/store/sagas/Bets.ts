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

    toast.success(
      'Suas apostas foram feitas com sucesso e estão disponíveis na Home!',
    )
    toast.success('Continue apostando para aumentar suas chances de ganhar!!', {
      autoClose: 7000,
    })

    yield put(clearCart())
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
