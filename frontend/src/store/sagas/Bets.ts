import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { put, all, takeEvery, fork, call } from 'redux-saga/effects'
import { Game, Type } from '../../interfaceies/game'
import api from '../../services/api'

import {
  saveBetsRequest,
  saveBetsSuccess,
  saveBetsFailure,
  Types,
  getBetsRequest,
  getBetsSuccess,
  getBetsFailure,
} from '../ducks/Bets'
import { clearCart } from '../ducks/Cart'

interface betRequest extends Game {
  game: Type
  // eslint-disable-next-line camelcase
  created_at: string
}

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

export function* handleGetBets({ payload }: ReturnType<typeof getBetsRequest>) {
  try {
    console.log(payload.page)
    const response: AxiosResponse = yield call(
      api.get,
      `/bets?page=${payload.page}`,
    )

    const bets = response.data.data.map((bet: betRequest) => {
      return {
        type: bet.game.type,
        color: bet.game.color,
        date: bet.created_at,
        price: bet.price,
        numbers: bet.numbers,
      }
    })

    yield put(getBetsSuccess(bets, response.data.lastPage))
  } catch (error) {
    yield put(getBetsFailure(error.message))
  }
}
function* watchOnHandleSaveBets() {
  yield takeEvery(Types.SAVE_BETS_REQUEST, handleSaveBets)
}

function* watchOnHandleGetBets() {
  yield takeEvery(Types.GET_BETS_REQUEST, handleGetBets)
}

export default function* lyricsSaga() {
  yield all([fork(watchOnHandleSaveBets), fork(watchOnHandleGetBets)])
}
