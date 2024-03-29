import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { AuthState } from './ducks/Auth'
import { BetState } from './ducks/Bets'
import { CartState } from './ducks/Cart'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

export interface AppStore {
  Auth: AuthState
  Cart: CartState
  Bets: BetState
}

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store: Store<AppStore> = createStore(
  rootReducer,
  applyMiddleware(...middleware),
)

sagaMiddleware.run(rootSaga)

export default store
