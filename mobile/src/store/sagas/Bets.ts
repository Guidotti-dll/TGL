/* eslint-disable camelcase */
import { AxiosResponse } from 'axios'
// import { toast } from 'react-toastify'
import { put, all, takeEvery, fork, call } from 'redux-saga/effects'

import { Game, Type } from '../../Interfaces/game'
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

interface betRequest {
  game_id: number
  numbers: number[]
}
interface getBetRequest extends Game {
  id: number
  game: Type
  created_at: string
}

export function* handleSaveBets({
  payload,
}: ReturnType<typeof saveBetsRequest>) {
  const bets = payload.bets.map((bet: betRequest) => {
    return {
      game_id: bet.game_id,
      numbers: bet.numbers,
    }
  })

  try {
    const response: AxiosResponse = yield call(api.post, `/bets`, { bets })

    yield put(clearCart())
    yield put(saveBetsSuccess())
    // toast.success('Suas apostas foram feitas com sucesso!')
  } catch (error) {
    yield put(saveBetsFailure(error.message))
  }
}

export function* handleGetBets({ payload }: ReturnType<typeof getBetsRequest>) {
  try {
    const response: AxiosResponse = yield call(
      api.get,
      `/bets?page=${payload.page}`,
    )

    if (+response.data.total > payload.total) {
      const bets = response.data.data.map((bet: getBetRequest) => {
        return {
          id: bet.id,
          type: bet.game.type,
          color: bet.game.color,
          date: bet.created_at,
          price: bet.price,
          numbers: bet.numbers,
        }
      })

      const page = bets.length < 20 ? payload.page : payload.page + 1

      yield put(getBetsSuccess(bets, page))
    }
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
